## rax-page-layout

## Install

```
$ npm install rax-page-layout --save
```

## Usage

```
import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';
```

## API

### Props

|name|type|default|describe|
|:---------------|:--------|:----|:----------|
|name|String|''|describe|

### Function

|name|param|return|describe|
|:---------------|:--------|:----|:----------|
|name|Object|/|describe|

## Example

```
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';

render(<PageLayout />, document.body, { driver: DriverUniversal });
```
