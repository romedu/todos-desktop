import React, {Component} from "react";
import NavBar from "../../components/navigation/NavBar/NavBar";
import ToolBar from "../../components/navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/navigation/SideDrawer/SideDrawer";

class Nav extends Component {
   state = {
      showSideDrawer: false
   };

   hideSideDrawer = () => this.setState({showSideDrawer: false});
   toggleSideDrawer = () => this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));

   render(){
      return (
         <div>
            <NavBar />
            <ToolBar toggleSideDrawer={this.toggleSideDrawer}/>
            <SideDrawer hideHandler={this.hideSideDrawer} showing={this.state.showSideDrawer} />
         </div>
      );
   }
};

export default Nav;