import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearFoldersList} from "../../../store/actions/folder";
import IconList from "../IconList/IconList";
import SortOptions from "../SortOptions/SortOptions";
import Pagination from "../Pagination/Pagination";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";
import actionTypes from "../../../store/actions/actionTypes";
import {toKebabCase, getQueries} from "../../../helpers";

class DesktopContent extends Component {
   componentWillUnmount(){
      const {itemsType, onFolderListClear, onTodosClear} = this.props;

      if(itemsType === "folder") return onFolderListClear(); 
      return onTodosClear(); 
   }

   paginateHandler = page => {
      const {location, history} = this.props,
            {sort} = getQueries(location.search);

      history.push(`${location.pathname}?sort=${sort}&page=${page}`);
   }

   render(){
      const {sorting, location, folders, todos, foldersPaging, todosPaging, newFormHandler, settingsHandler, deleteHandler, setSortingHandler} = this.props,
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
               ? <IconList folders={folders} todos={todos} openHandler={this.openFolderHandler} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />
               : <h4> Your desktop is empty, *** SAD FACE *** </h4>,
            sortingLabels = ["Popularity", "Unpopularity", "Newest to Oldest", "Oldest to Newest", "From A-Z", "From Z-A"],
            currentPage = Number(getQueries(location.search).page) || 1,
            totalItems = foldersPaging.total || todosPaging.total,
            itemsLength = (folders && folders.length) || (todos && todos.length),
            itemsLimit = foldersPaging.limit || todosPaging.limit,
            pagination = (totalItems > itemsLength) && (totalItems >= (currentPage * itemsLimit) -1)
                        && <Pagination currentPage={currentPage} limit={itemsLimit} total={totalItems} paginateHandler={this.paginateHandler} />;

      return (
         <Fragment>
            <ButtonGroup buttons={buttons} />
            <SortOptions sortingLabels={sortingLabels} selectedSorting={sorting.label} setSortingHandler={setSortingHandler} />
            {itemList}
            {pagination}
         </Fragment>
      )
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
   onFolderListClear: () => dispatch(clearFoldersList()),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   setSortingHandler: sortingData => dispatch({type: actionTypes.SET_SORTING, ...sortingData})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopContent));