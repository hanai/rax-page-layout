## rax-page-layout

Classic page layout for rax application.

| ![web_qr_code](https://user-images.githubusercontent.com/1222115/80943561-0efd5a00-8e1a-11ea-8639-056c630ffb44.png) |
| --- |
| [web](https://blog.ihanai.com/rax-page-layout/build/web/index.html) |

## Install

``` bash
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

| **name** | **type** | **default** | **required** | **describe** | **support** |
|:---|:---|:---|:---|:---|:---|
| children | RaxNode | - | false |PageMain \| PageHeader \| PageFooter | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |

### PageMain

Main content container for a page.

#### Props

| **name** | **type** | **default** | **required** | **describe** | **support** |
|:---|:---|:---|:---|:---|:---|
| children | RaxNode | - | false | children element | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| hasPullToRefresh | boolean | false | false | if has pull to refresh | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| isRefreshing | boolean | false | false | refresh state | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| betterScroll | boolean | false | false | if use better-scroll | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |


### PageHeader/PageFooter

## Example

```
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';

render(<PageLayout />, document.body, { driver: DriverUniversal });
```

---

## License

MIT
