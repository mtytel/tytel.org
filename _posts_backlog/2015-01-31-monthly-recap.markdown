---
layout: page
title:  "Monthly Recap - 1st Month"
date:   2015-01-31 12:30:00
categories: blog devblog twytch recap
permalink: /blog/:year/:month/:day/:title/
---
Today I'm one month into development on [Twytch][twytch] and I'm happy with
how far I've come. Overall a lot of the time was spent learning [JUCE][juce]
and creating different UI elements, but considering this, many of the
elements have achieved a good [MVP, not MVPOS][mvpos].

Here's a list of notable things achieved this month:

Interface
* Graphical Oscillator Wave Viewer
* Graphical ADSR Envelope
* Graphical Step Sequencer
* Graphical Filter Display with X/Y control
* Knobs
* Oscilloscope
* An unappealing but functional drag and drop modulation routing.

DSP
* Added Band Pass, All Pass, Notch, Low Shelf and High Shelf filters.
* Created Arpeggiator
* Fixed edge case bugs in Portamento/Legato

Other
* Added ability to remove processors.
* Patch Loading
* Patch Saving

[juce]:        http://www.juce.com/
[twytch]:      https://github.com/mtytel/twytch
[mopo]:        https://github.com/mtytel/mopo
[mvpos]:       http://robertnealan.com/mvp-not-mvpos/
