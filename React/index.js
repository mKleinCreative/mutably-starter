import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Fetch from 'react-fetch'
import App from "./App";

render(<App />, document.querySelector("#app"));

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)