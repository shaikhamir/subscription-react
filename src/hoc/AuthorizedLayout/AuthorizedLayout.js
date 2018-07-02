import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Aux from "../_Aux/_Aux";
import Header from "../../components/Header/Header";
import Subscribes from "../../components/Subscribes/Subscribes";
import NewSubscription from "../../components/NewSubscription/NewSubscription";

import "./AuthorizedLayout.scss";

export default class AuthorizedLayout extends Component {
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.replace("/");
    }
  }

  routes = [
    {
      path: "/dashboard/subscriptions",
      component: Subscribes,
      pageTitle: "Subscription list"
    },
    {
      path: "/dashboard/new-subscription",
      component: NewSubscription,
      pageTitle: "Purchase new subscription"
    }
  ];

  GenerateRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} {...rest} />} />
  );

  logoutHandler = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.props.history.push("/");
  };

  render() {
    return (
      <Aux>
        <Header logoutClicked={this.logoutHandler} />
        <main>
          <Switch>
            {this.routes.map((route, index) => (
              <this.GenerateRoutes key={index} {...route} />
            ))}
          </Switch>
        </main>
      </Aux>
    );
  }
}
