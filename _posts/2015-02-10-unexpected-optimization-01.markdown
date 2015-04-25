---
layout: page
title:  "Unexpected Optimization #1: avoiding denormals"
date:   2015-02-10 12:30:00
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

A [denormal][denormal] is a type of really small floating point number.
Wikipedia give a better explanation, but in short the structure of floating
point numbers cause the gap from 0 to the smallest positive number to be much
larger than the gap between the two smallest positive numbers. Architectures
compensate for this by setting aside some numbers that are more evenly spaced
really close to zero called "denormal numbers" or "subnormal numbers". The
problem with this in synth development, is that processing subnormal numbers
is much slower than normal floating point numbers. Since we create really
small numbers any time there's an exponential decay like in an envelope or a
filter, we need to disable denormals.

The alternative to having denormals is flushing those numbers to zero. All
we have to do is slap an environment variable setting and we should be good to
go! (on some machines)

{% highlight c++ %}
#include <fenv.h>
// ...
fesetenv(FE_DFL_DISABLE_SSE_DENORMS_ENV);
{% endhighlight %}

[twytch]:      https://github.com/mtytel/twytch
[dspfilters]:  https://github.com/vinniefalco/DSPFilters
[denormal]:    http://en.wikipedia.org/wiki/Denormal_number
