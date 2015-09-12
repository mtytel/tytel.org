---
layout: page
title:  "Monophonic Note Retriggering"
date:   2015-04-25 12:30:00
categories: blog devblog helm MIDI
permalink: /blog/:year/:month/:day/:title/
---

There's a feature in most monophonic synthesizers where you can trigger
notes by *releasing* keys in addition to pressing them. Since monphonic synths
can only play one note at a time, the most recently pressed note is active.
When you release the active note, it will retrigger the most recently pressed
of the remaining held notes. What this allows is a very fast way to alternate
between two notes by holding one note down and repeatedly pressing another.



[helm]:      https://github.com/mtytel/helm
[mopo]:        https://github.com/mtytel/mopo
