import 'core-js/shim';
import 'fetch';
import React from 'react';
import { Statements } from './view';

React.render(
  Statements.create(),
  document.getElementById('app')
);