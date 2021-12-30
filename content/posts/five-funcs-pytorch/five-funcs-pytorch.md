---
title: Five tensor operations
date: 2020-05-30T11:00:00.000Z
description: A short introduction to PyTorch starting with 5 tensor methods.
---

Last week I enrolled in [FreeCodeCamp's ZeroToGANs](http://zerotogans.com/) deep learning with PyTorch
course. The motivation behind doing so was mainly because of quarantine and wanting to learn something
new while being on lockdown.

As a software engineer mainly focused on app development, who by the way, barely completed college
level algebra and trig, I can say in total confidence that I have no clue what the hell I am getting
myself into or even if I have the capacity to complete it.

But, the cool thing about this course is that the instructors take a `code-first` rather than a
`math-first` approach in teaching the lessons and I think this works well for me because one thing
I can learn to userstand is code.

Now whether the `code-first` approach is the right way to get introduced into the space of machine
learning is something I won't get into and of course there are concepts that I would have to
learn in order to contribute anywhere effectively but the way I see it is:

> `I have to start somewhere right?`

So with all that said, this is by no means a hardcore introduction to data science. I won't be going
into things like **gradient descent**, **linear regression**, **neural networks** etc. because there
are plenty of authority figures who are better equipped to do so. Instead, what you'll find below
are **5 PyTorch methods** I found interesting that I think are a good way to get introduced to the
space starting with code.

## A little intro to PyTorch and torch.tensor

[PyTorch](https://pytorch.org/) is a python library built and maintained by Facebook, full of
programs to help facilitate building of deep learning projects.

PyTorch at its core processes multi-dimensional matrix called a
[tensor](https://pytorch.org/docs/stable/tensors.html). A tensor can contain **_integers_**,
**_floats_** and **\*booleans**.

To create a tensor in PyTorch, use the `torch.tensor` API likeso:

```Python
import torch

torch.tensor([1, 2, 3, 4])

# Output
tensor([1., 2., 3., 4.])
```

In the example above I created a one dimensional tensor with integers valued 1 - 4.

Outside of `torch.tensor`, the five methods I'll go over are:

-   torch.arange()
-   torch.split()
-   torch.stack()
-   torch.abs()
-   torch.add()

These are just methods I found that might be a good intro into PyTorch API but of course, if you want
to learn more check out the [documentation](https://pytorch.org/docs/stable/torch.html).

## Function #1 - torch.arange

Returns a one dimensional tensor with values from **_start_** to **_end_** incremented by **_steps_**.

```Python
# Example 1: 1-D tensor with size of 10 with steps of 1
torch.arange(10)

# Output
tensor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

Notice that the first value in our tensor starts with 0. If no **_start_** parameter is provided,
it defaults to **0**.

```Python
# Example 2 - More parameters
torch.arange(1., 2, .1, requires_grad = True)

# Output
tensor([1.0000, 1.1000, 1.2000, 1.3000, 1.4000, 1.5000, 1.6000, 1.7000,
1.8000, 1.9000], requires_grad=True)
```

Notice here the start and steps parameters are **float** points. We can also provide a range of
other parameters such as **_requires_grad_**, **_out_**, **_dtype_**, **_layout_** and **_device_**.

```Python
# Example 3 - breaking (to illustrate when it breaks)
length = 10
width = 5
torch.arange(length * width, step = 1, dtype = torch.get_default_dtype())

# Output
TypeError: arange() received an invalid combination of arguments
```

Be mindeful of how you organize your parameters. Correct way to write this would be like so:

```Python
torch.arange(start = 0, end = length * width, step = 1,
dtype = torch.get_default_dtype())
```

> torch.arange can be useful to create a one dimensional tensor of indices.

## Function #2 - torch.split

Splits the tensor into chunks. Each chunk is a view of the original tensor.

```Python
# Example 1 - Basic split
input_tensor = torch.tensor([50, 80, 10, 2])
torch.split(input_tensor, split_size_or_sections = 1)

# Output
(tensor([50]), tensor([80]), tensor([10]), tensor([2]))
```

Above we created a input tensor and used the split method to break our tensor data into equal
chunks of size 1.

```Python
# Example 2 - Split a tensor of ones, size 10, into chunks of at most size 2
x = torch.ones(10)
torch.split(x, 2)

# Output
(tensor([1., 1.]),
 tensor([1., 1.]),
 tensor([1., 1.]),
 tensor([1., 1.]),
 tensor([1., 1.]))
```

In the example above, first we created a tensor of **1**'s size 10. After which we use the split
method to split the tensor into chucks of seperate tensors with a size of atmost 2.

```Python
# Example 3 - breaking (to illustrate when it breaks)
y = torch.zeros([3, 3])
torch.split(y, 1, 3)

# Output
IndexError: Dimension out of range (expected to be in range of [-2, 1], but got 3)
```

We get this error **_IndexError: Dimension out of range_** when we attempt increase the dim size.
This causes an issue with the shape. Keep in mind the dimensions along which you want to split the tensor.

> torch.split is perfect when you need to split a Tensor into equal-size chunks!

## Function #3 - torch.stack

Concatenates sequence of tensors along a new dimension.

```Python
# Example 1 - Basic example
a = torch.ones([3, 3])
b = torch.zeros([3, 3])
torch.stack([a, b])

# Output
tensor([[[1., 1., 1.],
         [1., 1., 1.],
         [1., 1., 1.]],
        [[0., 0., 0.],
         [0., 0., 0.],
         [0., 0., 0.]]])
```

In the above example we create two seperated tensors using **_ones_** and **_zeros_**. After which
was concatenated into one tensor using the **_stack_** method.

```Python
# Example 2 - Stack two tensor on one dimension
c = torch.ones(5)
d = torch.zeros(5)
torch.stack([c, d], 1)

# Output
tensor([[1., 0.],
        [1., 0.],
        [1., 0.],
        [1., 0.],
        [1., 0.]])
```

In the above example we created another two tensors with the **_ones_** and **_zeros_** method.
This time when we concatenated them using the **_stack_** method we added an extra parameter for
our dimension we want to **_stack_** along.

```Python
# Example 3 - breaking (to illustrate when it breaks)
e = torch.ones(3)
f = torch.zeros(4)
torch.stack([e, f])

# Output
RuntimeError: stack expects each tensor to be equal size, but got
[3] at entry 0 and [4] at entry 1
```

We get the error above **_stack expects each tensor to be equal size_** because the shapes of
tensor **_e_** and **_f_** are not the same.

> torch.stack function is perfect when you need to concatenate two tensors of equal size.

## Function #4 - torch.abs

Computes the element-wise absolute value of the given input tensor.

```Python
# Example 1 - Basic example
ex_tensor = torch.tensor([-1, -2, -3])
torch.abs(ex_tensor)

# Output
tensor([1, 2, 3])
```

In the above example, first we created a tensor with all negative integers and passed that tensor
through torches **\*abs** which turned every element to a positive integer.

```Python
# Example 2
m = torch.tensor([1])
n = torch.tensor([2])
print('negative:', m - n)
torch.abs(m - n)

# Output
negative: tensor([-1])
tensor([1])
```

Similar to the first example, here we create two tensors using **_tensor_** method, after which we
run some arithmitic on both tensors which returns a negative integer but as you can see when we
pass that same expression to **_abs_** method it returns as positive.

```Python
# Example 3 - breaking (to illustrate when it breaks)
o = numpy.array([1, [-2]])
torch.abs(o)

# Output
TypeError: abs(): argument 'input' (position 1) must be Tensor, not numpy.ndarray
```

Make sure you pass a tensor as a argument to torch.abs unless it will throw the above error:
**_abs(): argument 'input' (position 1) must be Tensor, not numpy.ndarray_**.

> torch.abs is great when you want to work with all positive element in your tensor!

## Function #5 - torch.add

Adds the scalar other to each element of the input and returns a new resulting tensor.

```Python
# Example 1 - Basic example
p = torch.ones(10)
torch.add(p, 9)

# Output
tensor([10., 10., 10., 10., 10., 10., 10., 10., 10., 10.])
```

So in the above example we create a tensor of ones with size of 10 using **_ones_** method. Next we
pass our tensor of ones to the **_add_** method with an accumulator of 9 which takes each element
of our tensor and add 9 to it.

```Python
# Example 2
q = torch.randn(4)
r = torch.randn(1)
torch.add(q, r, alpha = 10)

# Output
tensor([17.4783, 17.0044, 17.4107, 19.7463])
```

In this example we create a tensor of random floats with size of 4. Next we create a tensor of a
random integer with size of one. Finally we add all the elements of **_q_** with **_r_** with a
scalar multiplier of **_10_**.

```Python
# Example 3 - breaking (to illustrate when it breaks)
s = complex(1, 1)
t = torch.zeros(1)
torch.add(t, s)

# Output
RuntimeError: Complex dtype not supported.
```

In the above example we create a complex number using the **_complex_** method. Then we create a
tensor of **_0_**'s with size of one and then attempt to add the element of our tensor to our
complex number. We get the error: **_Complex dtype not supported._** because only **_integers_** and
**_floats_** are supported in the **_add_** method.

> This function is great when you need to accumulate each element in your tensor by the same value.

## And that's about it

If you enjoyed this little intro I recommend checking out the rest of the documentation and also the
course. I'll link them below.

If you want to play around with the code, I've created a [Jupyter notebook](https://jovian.ml/unknouun/01-tensor-operations).
There you can run the examples I've written above. You can also fork it and play around with the API yourself if you so please.

## Reference Links

-   [Official documentation for `torch.Tensor`](https://pytorch.org/docs/stable/tensors.html)
-   [ZeroToGANs Lecture #1 PyTorch Basics - Tensors & Gradients](https://jovian.ml/aakashns/01-pytorch-basics)
