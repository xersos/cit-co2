import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

// Shared //
import { classNames } from "./shared/Utils";

// Components //
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import AddClassroom from "./components/classroom/add-classroom.component";
import Classroom from "./components/classroom/classroom.component";
import ClassroomsList from "./components/classroom/classroom-list.component";
import AddSensor from "./components/sensor/add-sensor.component";
import Sensor from "./components/sensor/sensor.component";
import SensorsList from "./components/sensor/sensor-list.component";
import SensorValuesList from "./components/sensor-values/sensor-values-list.component";

// Action //
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

// Helper //
import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

import logo from "./img/logoCIT.png";
import Room from "./components/room.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <div>
                        <img
                          className="block lg:hidden h-8 w-auto"
                          src={logo}
                          alt="CIT"
                        />
                      </div>
                      <div>
                        <img
                          className="hidden lg:block h-8 w-auto"
                          src={logo}
                          alt="CIT"
                        />
                      </div>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                          <a href='/home' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                                px-3 py-2 rounded-md text-sm font-medium">
                            Home
                          </a>
                      </div>
                    </div>
                    {showAdminBoard && (
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                          <a href='/classrooms' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                                px-3 py-2 rounded-md text-sm font-medium">
                            Classrooms
                          </a>
                      </div>
                    </div>
                    )}
                    {showAdminBoard && (
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                          <a href='/sensors' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                                px-3 py-2 rounded-md text-sm font-medium">
                            Sensors
                          </a>
                      </div>
                    </div>
                    )}
                    {showAdminBoard && (
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                          <a href='/sensor-values' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                                px-3 py-2 rounded-md text-sm font-medium">
                            Sensor Values
                          </a>
                      </div>
                    </div>
                    )}
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">View profile</span>
                         <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {currentUser ? (
                          <div>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/profile"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                {currentUser.username}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a onClick={this.logOut}
                                href="/login"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                          </div>
                          ): ( 
                          <div>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/login"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Login
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/register"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign Up
                              </a>
                            )}
                          </Menu.Item>
                          </div>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  {currentUser && (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                        <a href='/profile' className="bg-green-500 text-white text-gray-300 hover bg-gray-700 hover text-white
                              px-3 py-2 rounded-md text-sm font-medium">
                          Hi {currentUser.username} !
                        </a>
                    </div>
                  </div>
                  )}
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div>
                    <a href='/home' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                        px-3 py-2 rounded-md text-sm font-medium">
                        Home
                    </a>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div>
                    <a href='/classrooms' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                        px-3 py-2 rounded-md text-sm font-medium">
                        Classrooms
                    </a>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div>
                    <a href='/sensors' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                        px-3 py-2 rounded-md text-sm font-medium">
                        Sensors
                    </a>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div>
                    <a href='/sensor-values' className="bg-gray-900 text-white text-gray-300 hover bg-gray-700 hover text-white
                        px-3 py-2 rounded-md text-sm font-medium">
                        Sensor Values
                    </a>
                  </div>
                </div>
                {currentUser && (
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      <div className="flex space-x-4">
                        <a href='/profile' className="bg-green-500 text-white text-gray-300 hover bg-gray-700 hover text-white
                              px-3 py-2 rounded-md text-sm font-medium">
                          Hi {currentUser.username} !
                        </a>
                      </div>
                    </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
          <div className="mt-3">
            <Switch>
              <Route exact path={["/", "/classrooms"]} component={ClassroomsList} />
              <Route exact path="/classroom/add" component={AddClassroom} />
              <Route path="/classroom/:id" component={Classroom} />
              <Route exact path={["/", "/sensors"]} component={SensorsList} />
              <Route exact path="/sensor/add" component={AddSensor} />
              <Route path="/sensor/:id" component={Sensor} />
              <Route exact path={["/", "/sensor-values"]} component={SensorValuesList} />
              <Route exact path={["/", "/home"]} component={Home}/>
              <Route name="room" exact path={["/room/:id"]} component={Room}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/profile" component={Profile}/>
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);