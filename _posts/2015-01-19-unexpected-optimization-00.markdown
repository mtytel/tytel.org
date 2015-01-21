---
layout: page
title:  "Unexpected Optimization #0: at() vs operator[]"
date:   2015-01-19 12:30:00
categories: blog devblog twytch optimization
permalink: /blog/:year/:month/:day/:title/
---
Writing a soft synth requires a lot of optimization. As I develop
[twytch][twytch] and the synth engine it's built on, [mopo][mopo], I'll be
posting many of the optimizations I make, especially nonobvious ones. These
could range from simple things like using one-multiply instead of
two-multiply interpolation:

{% highlight c++ %}
// These lines compute the same value.
double one_multiply = from + t * (to - from);  // 1 multiply and 2 adds
double two_multiply = t * to + (1 - t) * from; // 2 multiplies and 2 adds
{% endhighlight %}

Or could be uglier solutions like embedding assembly instructions in C++.
I'm not a C++ optimization expert yet, so some of these things may be more
obvious than others.

This first unexpected optimization concerns accessing values from std::vector.
Consider these two methods of element access:

{% highlight c++ %}
std::vector<double> vect = ...;
double one = vect[0];
double two = vect.at(0);
{% endhighlight %}

There is a significant difference between the two: at() does boundary checking
while operator[] does not. You don't normally notice this performance
difference, but I was running it once per audio sample for every single
component which totaled in the millions per second.

Now why would I use at() instead of operator[] in
the first place? The way mopo sets up polyphony is that all the module
instances in each voice share a list of input pointers. For example, every
Filter instance in each poice has a pointer to the same std::vector. Using at()
on a pointer to std::vector is much easier to read than using operator[] or
dereferencing first so I first chose the slower but prettier method.

{% highlight c++ %}
std::vector<double>* pvect = new std::vector<double>();
pvect->push_back(1.0);

double slow = pvect->at(0);          // easy to read but slow.
double fast1 = pvect->operator[](0); // fast ugly access 1
double fast2 = (*pvect)[0];          // fast ugly access 2
{% endhighlight %}

Fortunately switching from at() to operator[] an easy thing to fix, and I got a
significant 25% speed boost because of it.

[twytch]:      https://github.com/mtytel/twytch
[mopo]:        https://github.com/mtytel/mopo
