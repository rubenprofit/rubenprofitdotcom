---
title: Interfaces and Classes
date: 2019-11-21T11:00:00.000Z
description: Contract, no EULA.
---

So I've been interested [Typescript](https://www.typescriptlang.org/index.html) for a
while now because I kept seeing tweets like [these](https://twitter.com/kosalanuwan/status/1166276082451902465)
and I absolutely had to see what all the rage was about.

After trying it out I immediately saw all of the philosophical and technical benefits that it brings
to developing javascript applications. And over the course of me playing around with the language there were a lot
of things it brought to the javascript ecosystem that I was excited to use but for now I want to focus on just one,
[Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html#introduction).

More specifically, the relationship between Interfaces and Classes and how and when to use them.

**_Note: I know Interfaces are already a thing in languages like C#, Java and other OOP languages.
This post is focused on use cases in Typescript. If you don't care feel free to hit me up with topics
you would like me to cover._**

According to the typescript documentation, an Interface is:

> A powerful way of defining contracts within your code outside your project.

To put it simply a Interface descibes _what_ a piece of code _must_ do.

Here's an example of a simple Interface:

```Typescript
interface BookInterface {
    title: string;
    author: string;
    pages: number;
    currentPage: number;
}
```

Now lets break this down. First we've initiated a _BookInterface_ interface with the keyword _interface_
and within our interface we describe properties called: _title_ and _author_ whose types must be strings;
_pages_ and _currentPage_ whose types _must_ be numbers. This tells any piece of code we have that
implements our Book interface that they must contain these variables and types.

But not only can we describe variables in an interface, we can also describe methods. Here's an example
extending our Book interface:

```Typescript
interface BookInterface {
    title: string;
    author: string;
    pages: number;
    currentPage: number;
    read(pgs: number): void;
}
```

In the above example we described a method called `read` whose type is `void` because we won't be
returning anything. The read method will just accept a parameter called `pgs` whose type must a
number and set the `currentPage` depending on how many pages read.

Since we created a Book interface, we exposed a few custom types now we can create a class that
follows the contract described by our interface, like so:

```Typescript
class Book implements BookInterface {
  public title: string;
  public author: string;
  public pages: number;
  public currentPage: number;
  public constructor(
    title: string,
    author: string,
    pages: number,
    currentPage: number = 0
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = currentPage;
  }
  public read(pgs: number) {
    this.currentPage = pgs;
  }
}
```

Here we created a class called `Book` and by using the `implements` keyword we can have our class
subscribe to the contract of the `BookInterface`. Inside we give it all the properties, methodds
described in the interface and a `constructor` method to initialize an object. Now we have a class
that has custom types that are strictly enforced by our interface. This helps us have more
predictable and reusable code. We attached the **_public_** label to each item in order to avoid
calling the **_super()_** method.

**Note: Any class that implements an interface and does not include all of the properties will throw
the error:** **_Class incorrectly implements interface. Property is missing in type but required
in type._**

Now if we create a new instance of our `Book` we can see that all the custom types are there and checked:

```Typescript
const favoriteBook = new Book("Old Man's War", "John Scalzi", "351")
favoriteBook.read(10)
console.log(favoriteBook)
// Book { name: "Old Man's War", author: "John Scalzi", pages: 351, currentPage: 10 }
```

We can also use interfaces to create a custom type for initializing an object in our classes, like so:

```Typescript
interface BookConstructor {
  new (title: string, author: string, pages: number, currentPage: number): BookInterface
}

interface BookInterface {
    title: string;
    author: string;
    pages: number;
    currentPage: number;
    read(pgs: number): void;
}

class Book implements BookInterface {
  public title: string;
  public author: string;
  public pages: number;
  public currentPage: number;
  public constructor(
    title: string,
    author: string,
    pages: number,
    currentPage: number = 0
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = currentPage;
  }
  public read(pgs: number) {
    this.currentPage = pgs;
  }
}

const favoriteBook = new Book("Old Man's War", "John Scalzi", "351")
favoriteBook.read(10)
```

Above, we created a new Interface because the last interface we created defined the instance methods
and properties and can't do both. Our new interface is very similar to the last interface we created
but also very different. After using the `interface` keyword to define a `BookConstructor` we then
set a `new` operator property with all the same parameters and types we need to construct our Book
class. The key here though is the `BookInterface` typing we assign the the new operator. This tells
typescript to run a check on the `BookInterface` to ensure that we have the necessary
parameters to create a new instance.

Using interfaces are an pretty good way to make sure that your classes play by the rules you want them to.

So now that we've covered the basics of how to create an interface and how they interact with classes,
let's look at a practical application of what we went over and put it together in a react app.

Lets say we wanted to create a simple web component that renders data about a book we are currently
reading and allows us to update the current page. We can use the same **BookInterface** we created
above and just pass it to a component like so:

```Typescript
import React, { useState } from "react";

interface BookInterface {
    title: string;
    author: string;
    pages: number;
    currentPage: number;
    read(pgs: number): void;
}

const BookComponent = (props: BookInterface) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (e: object): void => {
    e.preventDefault();
    setValue(e.target.value);
  }

  return (
  <div>
    <p>{props.title}</p>
    <p>{props.author}</p>
    <p>{props.pages}</p>
    <p>{props.currentPage}</p>
    <input value={value} onChange={e => handleChange(e)} placeHolder='Current Page' />
    <button onClick={() => props.read(value)}>Current page</button>
  </div>
  )
}

export default App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const read = (pgs: number): void => {
    setCurrentPage(pgs);
  }

  return (
    <div className="App">
      <BookComponent
        title="Clean Code"
        author="Ruben Profit"
        pages={4}
        currentPage={currentPage}
        read={read}
      />
    </div>
  );
}
```

And Voila!!! There it is. We created fully annotated React app using Typescript's interfaces

If you have any other questions or want to take a deeper dive into Typescript, I recommend checking
out the documentation. I'll link it below. There's also a really cool playground there that you can
checkout and test out typescript right in the browser.

## Reference Links

-   [Official documentation for Typescript](https://www.typescriptlang.org/docs/home.html)
