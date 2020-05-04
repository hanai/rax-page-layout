## rax-page-layout

Classic page layout for rax application.

| ![preview_qr_code](https://user-images.githubusercontent.com/1222115/80943561-0efd5a00-8e1a-11ea-8639-056c630ffb44.png) |
| --- |
| [preview](https://blog.ihanai.com/rax-page-layout/build/web/index.html) |

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
