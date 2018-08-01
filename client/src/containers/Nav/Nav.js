import React, {Component} from "react";
import NavBar from "../../components/navigation/NavBar/NavBar";
import ToolBar from "../../components/navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/navigation/SideDrawer/SideDrawer";

class Nav extends Component {
   state = {
      showSideDrawer: false
   };

   toggleSideDrawer = () => this.setState(prevState => ({...prevState, showSideDrawer: !prevState.showSideDrawer}));
   hideSideDrawer = () => this.setState(prevState => ({...prevState, showSideDrawer: false}));

   render(){
      let sideDrawer = this.state.showSideDrawer ? <SideDrawer hideHandler={this.hideSideDrawer} /> : null;

      return (
         <div>
            <NavBar />
            <ToolBar toggleSideDrawer={this.toggleSideDrawer}/>
            {sideDrawer}
         </div>
      );
   }
};

export default Nav;