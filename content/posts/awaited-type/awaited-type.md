---
title: Awaited in Typescript
date: 2021-12-17T11:00:00.000Z
description: "New keyword drop!"
---

## Introduction

With the release of Typescript 4.5, a new utility type called `Awaited` was introduced. According to the documentation, this type "is meant to model operations like `await` in `async` functions, or the `.then()` method on Promise's - specifically the way that they recursively unwrap Promise's.". The goal of this article to attempt to unpack how this introduction can improve asynchronous programming.

**_Note: This article assumes you know the basic uses of typescript and promises in javascript._**

## The problem

Prior to the introduction of the `Awaited` keyword if you wanted to infer the return type of a promise after it resolved, you needed to `unwrap` the promise using the `infer` keyword. Below we will take a look at how that is done.

```Typescript
type Awaited<T> = T extends Promise<infer U> ? U : T; // custom Awaited type

const resolveTrue = Promise.resolve(true); // promise which resolves boolean

type promiseBoolean = Awaited<typeof resolveTrue>; // promiseBoolean is boolean!
```

As you can see in the above example, in order for us to get the `boolean` type resolved from the promise in `resolveTrue` we needed to first create an `Awaited` type which extended typescript's `Promise` type and *infer* the return type with `U` if it resolves and `T` if it doesn't resolve (ie. throws an error). Once typescript figures out the type of the promise, it will assign it to `U`. This is what typescript decribes as [inferring within conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types). You can see where the need to **unwrap** the type was necessary. Our boolean was **wrapped** in a Promise like so `Promise<boolean>` but we needed to unwrap it using our *custom* `Awaited` type to bubble up the `boolean` type we wanted.

## The new way to do things

With the introduction of the `Awaited` type, we no longer need to use the above method and create a custom type to **infer** the type of resolved promise. Typescript does all the inference for us straight out of the box!

Here's an example of it in action:

```Typescript
const resolveTrue = Promise.resolve(true);

type promiseBoolean = Awaited<Promise<typeof resolveTrue>>; // promiseBoolean type is boolean!

const getFalse = (): promiseBoolean => {
    return Promise.resolve(false);
}; // TS won't throw error!
```