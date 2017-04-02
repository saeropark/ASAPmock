import React, { Component } from 'react';

import Drawer from 'react-native-drawer'
import Home from '../js/Home';




export default class SideMenu extends Component {  
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  
  render () {
    return (
      //Parallax Effect (slack style)
        /*<Drawer
            type="static"
            content={<ControlPanel />}
            openDrawerOffset={100}
            styles={drawerStyles}
            tweenHandler={Drawer.tweenPresets.parallax}
            >
                <Main />
        </Drawer>*/

        //Material Design Style Drawer
        <Drawer
        type="overlay"
        content={<ControlPanel />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
        })}
        >
            <Home />
        </Drawer>


    )
  }
  


}