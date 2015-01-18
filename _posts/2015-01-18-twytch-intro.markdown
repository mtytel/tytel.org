---
layout: page
title:  "Starting Development on Twytch, an open source synthesizer"
date:   2015-01-18 04:59:06
categories: blog devblog twytch
permalink: /blog/:year/:month/:day/:title/
---
On the 1st day of 2015, I started development on an open source software synth, [Twytch][twytch]. I’ve decided to keep a devblog after seeing some of the devblog successes in the indie game development world such as [Willy Chyr’s Relativity][willy] and [Phosfiend Systems’ Fract OSC][fract].

The goal of Twytch is a mix of granular and subtractive synthesis that focuses on glitching live and sampled audio input. It currently runs as a VST and Audio Unit and hopefully will run as a stand-alone synthesizer in the future. Some of the technologies I’m using are:

- [JUCE][juce]: for cross platform UI development and VST/AU input and output handling
- [mopo][mopo]: a modular and polyphonic synthesizer engine I’m working on

I started with the code from a past synthesizer I made called [cursynth][cursynth]. It's this goofy stand-alone ascii synth that runs inside of a terminal with ascii sliders and graphics. From the past weeks of work I have a functioning Audio Unit synthesizer and the beginnings of many of the UI elements. There’s also very cumbersome patch saving and loading, but it works. I'm now at that point in development where you just throw all the controls on the screen and make an ugly UI soup. Have a look:

![Twytch Screenshot](/static/images/blog/2015-01-18-screenshot.png)

[twytch]:      https://github.com/mtytel/twytch
[willy]:       http://willychyr.com/blog/
[fract]:       http://fractgame.com/news
[cursynth]:    http://www.gnu.org/software/cursynth/
[juce]:        http://www.juce.com/
[mopo]:        https://github.com/mtytel/mopo
