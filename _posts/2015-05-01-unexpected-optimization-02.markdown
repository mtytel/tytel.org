---
layout: page
title:  "Unexpected Optimization #2: fixed point arithmetic"
date:   2015-05-01 12:30:00
categories: blog devblog twytch optimization
permalink: /blog/:year/:month/:day/:title/
---

I've wanted to add a 'unison' feature to Twytch for a while but without a
significant performance hit. Unison works by having many oscillators per voice
so improving the oscillator CPU usage was a must.

The way many oscillator implementations work is by having a 'phasor' which is
a phase value that cycles through the values from 0 to 1. When the phase value
is 0, we are at the beginning of the waveform, 0.5 we're half way through and
when we get to 1, we're at the end and we set the value back to 0. Checking if
we have to wrap the phase every sample for every oscillator can get pretty
costly. One way to improve this is by using the modf function instead of a
comparison and an if/else branch but it still is has a relatively large CPU
hit.

{% highlight c++ %}
int table_size = 2048;
double phase = 0.0;
double phase_diff = ...; // Usually we don't know what value this is.

for (int i = 0; i < samples; ++i) {
  phase += phase_diff;
  if (phase >= 1.0)
    phase -= 1.0;

  // Lookup value with phase. No interpolation for this example.
  int index = phase * table_size;
  output_buffer[i] = lookup[index];
}

// Alternatively with modf which is slightly more efficient.
double integral_part = 0.0;
for (int i = 0; i < samples; ++i) {
  phase = modf(phase + phase_diff, &integral_part);

  // Lookup value with phase. No interpolation for this example.
  int index = phase * table_size;
  output_buffer[i] = lookup[index];
}
{% endhighlight %}

There's another solution though and it's using 'fixed-point' instead of
'floating-point' numbers. Floating point numbers can represent a crazy large
range of numbers but for our phasor implementation we only care about number
between 0 and 1. What we can do is use an unsigned integer type to represent
these values. 0 will still remain the beginning of our waveform, but
UINT\_MAX will represent the end of our waveform. Cool thing about integers
is that when we add to our phase and go past UINT\_MAX, we get the wrapping
for free! Another benefit is if our wave lookup table is a power of two, we
can get the lookup index by bit shifting our current phase down which is
another (albeit small) performance improvement.

{% highlight c++ %}
int table_bits = 11;
int shift = 8 * sizeof(int) - table_bits;
int phase = 0;
int phase_diff = ...; // Usually we don't know what value this is.

for (int i = 0; i < samples; ++i) {
  phase += phase_diff;
  if (phase >= 1.0)
    phase -= 1.0;

  // One bit shift is more efficient than a multiply and cast I believe.
  int index = phase >> shift;
  output_buffer[i] = lookup
}
{% endhighlight %}

After this improvement I'm would say the DSP is at a releasable efficiency.
Comparing Twytch to other similar synths on the commercial market, it's in the
middle of the pack. The next thing I'll be focusing on is improving the UI
efficiency as there are a lot of moving parts in Twytch and most of them are
not CPU friendly.

[twytch]:      https://github.com/mtytel/twytch
[mopo]:        https://github.com/mtytel/mopo
