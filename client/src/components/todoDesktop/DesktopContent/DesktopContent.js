import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getFolders, getFolderNames, clearFolders, clearFoldersList} from "../../../store/actions/folder";
import {getLists} from "../../../store/actions/todoList";
import IconList from "../IconList/IconList";
import SortOptions from "../SortOptions/SortOptions";
import Pagination from "../Pagination/Pagination";
import NavItem from "../../navigation/NavItem/NavItem";
import Button from "../../UI/Button/Button";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";
import Loader from "../../UI/Loader/Loader";
import actionTypes from "../../../store/actions/actionTypes";
import {toKebabCase, getQueries} from "../../../helpers";

class DesktopContent extends Component {
   state = {
      isLoading: false
   }

   componentDidMount(){
      const {sorting, location} = this.props,
            {sort} = getQueries(location.search);

      if(!sort || (toKebabCase(sorting.label) === sort)) this.getItems();
   }

   componentDidUpdate(prevProps){
      const {isLoading} = this.state,
            {itemsType, sorting, location, folders, todos} = this.props,
            {sort} = getQueries(location.search),
            {page: currentPage, sort: sortParam} = getQueries(location.search),
            {page: prevPage, sort: prevSortParam} = getQueries(prevProps.location.search);

      if((prevProps.sorting.label !== sorting.label) || (prevProps.location !== location && (sort === sorting.label))
         || prevProps.itemsType !== itemsType || ((currentPage !== prevPage) && (prevSortParam === sortParam))) return this.getItems();

      // Update the UI after changing from the todos to the folders route and vice versa 
      else if(isLoading && ((!prevProps.folders && folders) || (!prevProps.todos && todos))) return this.setState({isLoading: false});
   }

   componentWillUnmount(){
      const {folders, todos, itemsType, onFolderListClear, onTodosClear} = this.props;

      if(folders && (itemsType === "folder")) return onFolderListClear(); 
      else if(todos) return onTodosClear(); 
   }

   getItems = () => {
      const tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {sorting, location, folders, folderNames, todos, itemsType, onFoldersGet, onFolderNamesGet, onFoldersClear, onTodosGet, onTodosClear} = this.props,
            pageParam = Number(getQueries(location.search).page) || 1, 
            action = (itemsType === "folder") 
                   ? () => {                    
                      if(todos) onTodosClear();
                      onFoldersGet(sorting.property, sorting.order, pageParam)} 
                   : () => {
                      if(folders) onFoldersClear();
                      onTodosGet(sorting.property, sorting.order, pageParam)};

      if(!folderNames && (Number(tokenExp) > currentTime)) onFolderNamesGet();
      this.setState({isLoading: true}, action);
   };

   paginateHandler = page => {
      const {location, history} = this.props,
            {sort} = getQueries(location.search);

      history.push(`${location.pathname}?sort=${sort}&page=${page}`);
   }

   render(){
      const {isLoading} = this.state,
            {sorting, location, folders, todos, itemsType, foldersPaging, todosPaging, openFolderHandler, newFormHandler, 
            settingsHandler, deleteHandler, setSortingHandler} = this.props,
            itemList = ((folders && folders.length) || (todos && todos.length))
               ? <IconList folders={folders} todos={todos} openHandler={openFolderHandler} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />
               : <Fragment>
                     <h4> Your desktop is empty </h4>
                     <Button action={newFormHandler} design="emptyDesktop"> Create a new {itemsType} </Button>
                 </Fragment>,

            currentPage = Number(getQueries(location.search).page) || 1,
            totalItems = foldersPaging.total || todosPaging.total,
            itemsLength = (folders && folders.length) || (todos && todos.length),
            itemsLimit = foldersPaging.limit || todosPaging.limit,
            pagination = (totalItems > itemsLength) && (totalItems >= (currentPage * itemsLimit) - itemsLimit)
                         //NOT DISPLAYING WHEN LANDING IN THE LAST PAGE OF RESULTS
                        && <Pagination currentPage={currentPage} limit={itemsLimit} total={totalItems} paginateHandler={this.paginateHandler} />;
            const content = isLoading ? <Loader />
                           : (
                              <Fragment>
                                 <SortOptions selectedSorting={sorting.label} setSortingHandler={setSortingHandler} />
                                 {itemList}
                                 {pagination}
                              </Fragment>
                           );
            
      return (
         <Fragment>
            <ButtonGroup>
               <Button action={newFormHandler}>
                  Create Item
               </Button>
               <NavItem style={(location.pathname === "/folders") && "selected"} url={!isLoading && `/folders?sort=${sorting.label ? toKebabCase(sorting.label) : "popularity"}`}>
                  Folders
               </NavItem>
               <NavItem style={(location.pathname === "/todos") && "selected"} url={!isLoading && `/todos?sort=${sorting.label ? toKebabCase(sorting.label) : "popularity"}`}>
                  TodoLists
               </NavItem>
            </ButtonGroup>
            {content}
         </Fragment>
      );
   }
}

const mapStateToProps = state => ({
   folders: state.folder.list,
   foldersPaging: state.folder.paginationData,
   folderNames: state.folder.namesList,
   todos: state.todoList.lists,
   todosPaging: state.todoList.paginationData,
   sorting: state.sorting
});

const mapDispatchToProps = dispatch => ({
   onFoldersGet: (sortProp, sortOrder, pageNum) => dispatch(getFolders(sortProp, sortOrder, pageNum)),
   onFolderNamesGet: () => dispatch(getFolderNames()),
   onFoldersClear: () => dispatch(clearFolders()),
   onFolderListClear: () => dispatch(clearFoldersList()),
   onTodosGet: (sortProp, sortOrder, pageNum) => dispatch(getLists(sortProp, sortOrder, pageNum)),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   setSortingHandler: sortingData => dispatch({type: actionTypes.SET_SORTING, ...sortingData})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopContent));