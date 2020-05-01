## rax-page-layout

## Install

```
$ npm install rax-page-layout --save
```

## Usage

```
import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';
```

## Components

### PageLayout

Layout view for a page.

#### Props

|name|type|default|describe|
|:---------------|:--------|:----|:----------|
| children | RaxNode | - | PageMain \| PageHeader \| PageFooter |

### PageMain

Main content container for a page.

#### Props

|name|type|default|describe|
|:---------------|:--------|:----|:----------|
| children | RaxNode | - | - |
| hasPullToRefresh | boolean | false | - |

### PageHeader/PageFooter

## Example

```
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';

render(<PageLayout />, document.body, { driver: DriverUniversal });
```
