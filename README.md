## rax-page-layout

Classic page layout for rax application.

[![rax-page-layout in Firefox for Android](https://res.cloudinary.com/marcomontalbano/image/upload/v1588403928/video_to_markdown/images/youtube--5F2Z4Mm5UGA-4834888bcd2b4555e72811f2a6951e10.jpg)](https://youtu.be/5F2Z4Mm5UGA "rax-page-layout in Firefox for Android")

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
