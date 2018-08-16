import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getFolders, clearFolders, clearFoldersList} from "../../../store/actions/folder";
import {getLists} from "../../../store/actions/todoList";
import IconList from "../IconList/IconList";
import SortOptions from "../SortOptions/SortOptions";
import Pagination from "../Pagination/Pagination";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";
import Loader from "../../UI/Loader/Loader";
import actionTypes from "../../../store/actions/actionTypes";
import {toKebabCase, getQueries} from "../../../helpers";

class DesktopContent extends Component {
   state = {
      isLoading: false
   }

   componentDidMount(){
      const {sorting} = this.props;
      if(sorting.label) this.getItems();
   }

   componentDidUpdate(prevProps){
      const {isLoading} = this.state,
            {sorting, location, folders, todos} = this.props;

      if((prevProps.sorting.label !== sorting.label) || prevProps.location !== location) return this.getItems();
      else if(isLoading && ((!prevProps.folders && folders) || (!prevProps.todos && todos))) return this.setState({isLoading: false});
      //NEED TO REMOVE THIS ONE, DOES EXACTLY THE SAME THING AS THE ONE ABOVE
      else if(isLoading && ((folders && (prevProps.folders !== folders)) || (todos && (prevProps.todos !== todos)))) return this.setState({isLoading: false});
   }

   componentWillUnmount(){
      const {itemsType, onFolderListClear, onTodosClear} = this.props;

      if(itemsType === "folder") return onFolderListClear(); 
      return onTodosClear(); 
   }

   getItems = () => {
      const {sorting, location, folders, todos, itemsType, onFoldersGet, onFoldersClear, onTodosGet, onTodosClear} = this.props,
            pageParam = Number(getQueries(location.search).page) || 1, 
            action = (itemsType === "folder") 
                   ? () => {
                      if(todos) onTodosClear();
                      onFoldersGet(sorting.property, sorting.order, pageParam)} 
                   : () => {
                      if(folders) onFoldersClear();
                      onTodosGet(sorting.property, sorting.order, pageParam)};

      this.setState({isLoading: true}, action);
   };

   paginateHandler = page => {
      const {location, history} = this.props,
            {sort} = getQueries(location.search);

      history.push(`${location.pathname}?sort=${sort}&page=${page}`);
   }

   render(){
      const {isLoading} = this.state,
            {sorting, location, folders, todos, foldersPaging, todosPaging, openFolderHandler, newFormHandler, settingsHandler, deleteHandler, setSortingHandler} = this.props,
            buttons = [
               {
                  description: "Create Item",
                  action: newFormHandler
               },
               {
                  description: "Folders",
                  url: `/folders?sort=${sorting.label ? toKebabCase(sorting.label) : "popularity"}`
               },
               {
                  description: "TodoLists",
                  url: `/todos?sort=${sorting.label ? toKebabCase(sorting.label) : "popularity"}`
               }
            ],
            itemList = ((folders && folders.length) || (todos && todos.length))
               ? <IconList folders={folders} todos={todos} openHandler={openFolderHandler} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />
               : <h4> Your desktop is empty, *** SAD FACE *** </h4>,
            sortingLabels = ["Popularity", "Unpopularity", "Newest to Oldest", "Oldest to Newest", "From A-Z", "From Z-A"],
            currentPage = Number(getQueries(location.search).page) || 1,
            totalItems = foldersPaging.total || todosPaging.total,
            itemsLength = (folders && folders.length) || (todos && todos.length),
            itemsLimit = foldersPaging.limit || todosPaging.limit,
            pagination = (totalItems > itemsLength) && (totalItems >= (currentPage * itemsLimit) -1)
                        && <Pagination currentPage={currentPage} limit={itemsLimit} total={totalItems} paginateHandler={this.paginateHandler} />;

            const content = isLoading ? <Loader />
                           : (
                              <Fragment>
                                 <ButtonGroup buttons={buttons} />
                                 <SortOptions sortingLabels={sortingLabels} selectedSorting={sorting.label} setSortingHandler={setSortingHandler} />
                                 {itemList}
                                 {pagination}
                              </Fragment>
                           );

      return (
         <Fragment>
            {content}
         </Fragment>
      );
   }
}

const mapStateToProps = state => ({
   folders: state.folder.list,
   foldersPaging: state.folder.paginationData,
   todos: state.todoList.lists,
   todosPaging: state.todoList.paginationData,
   sorting: state.sorting
});

const mapDispatchToProps = dispatch => ({
   onFoldersGet: (sortProp, sortOrder, pageNum) => dispatch(getFolders(sortProp, sortOrder, pageNum)),
   onFoldersClear: () => dispatch(clearFolders()),
   onFolderListClear: () => dispatch(clearFoldersList()),
   onTodosGet: (sortProp, sortOrder, pageNum) => dispatch(getLists(sortProp, sortOrder, pageNum)),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   setSortingHandler: sortingData => dispatch({type: actionTypes.SET_SORTING, ...sortingData})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopContent));