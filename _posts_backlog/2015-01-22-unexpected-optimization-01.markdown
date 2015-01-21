---
layout: page
title:  "Unexpected Optimization #1: avoiding denormals"
date:   2015-01-22 12:30:00
categories: blog devblog twytch optimization
permalink: /blog/:year/:month/:day/:title/
---
I've been noticing a strange spike in CPU usage while playing
with [Twytch][twytch]. When a synth voice rings and is not producing sound
anymore, it is killed and reused later to save CPU cycles. However, there's
a significant increase in CPU cycles shortly before a voice dies. For a while
this was a mystery, but I was recently reading some filter code that added
a very small alternating current to the input of the filter.

{% highlight c++ %}
{% endhighlight %}

[twytch]:      https://github.com/mtytel/twytch
[mopo]:        https://github.com/mtytel/mopo
