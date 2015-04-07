---
layout: page
title:  "Unexpected Optimization #1: avoiding denormals"
date:   2015-01-22 12:30:00
categories: blog devblog twytch optimization
permalink: /blog/:year/:month/:day/:title/
---
I've been noticing a strange spike in CPU usage while playing
with [Twytch][twytch]. When a synth voice rings out and is not producing sound
anymore, it is killed and reused later to save CPU cycles. However, there's
a significant increase in CPU cycles right before a voice dies. For a while
this was a mystery, but I was recently reading [some filter code in another
project][dspfilters] that added a very small alternating current to the input
of the filter. In the comment it said "Hack to prevent denormals".

A [denormal][denormal] is a type of really small floating point number. Given
the structure of floating point numbers, the gap between the two smallest
positive number is way smaller than the gap between the smallest positive
nubmer and zero. Architectures compensate for this by setting aside some
numbers that are more evenly spaced really close to zero called
"denormal numbers" or "subnormal numbers". The problem with this in synth
development, is that processing subnormal numbers is much slower than normal
floating point numbers. Since we create really small numbers any time there's
an exponential decay like in an envelope or a filter, we need to disable
denormals.

The alternative to having denormals is flushing those numbers to zero. All
we have to do is slap an environment variable setting and we should be good to
go!

{% highlight c++ %}
#include <fenv.h>
// ...
fesetenv(FE_DFL_DISABLE_SSE_DENORMS_ENV);
{% endhighlight %}

[twytch]:      https://github.com/mtytel/twytch
[mopo]:        https://github.com/mtytel/mopo
[dspfilters]:  https://github.com/vinniefalco/DSPFilters
[denormal]:    http://en.wikipedia.org/wiki/Denormal_number
