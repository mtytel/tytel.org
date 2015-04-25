---
layout: page
title:  "Experiments with Material Design"
date:   2015-05-01 12:30:00
categories: blog devblog twytch features
permalink: /blog/:year/:month/:day/:title/
---

So I've done a lot of UI changes with [Twytch][twytch] lately based off this
new design idea called [Material Design][material-design]. You should go check
it out yourself, but the basic idea is you take flat UI design and organize
it in layers like pieces of paper. The result is a combination of bold colors
and skeuomorphic shadows.

The shadows gave me pause, is it the 90's again where you slap a drop shadow on
everything? After looking through Google's examples and applying many of their
ideas to Twytch, I have to say that I'm now a born-again drop shadow believer.
They make colors really pop and are a great way to emphasize how important
certain elements are.

Google's design doc is pretty funny when they mention *how* to implement the
shadows. They say you shouldn't approximate the shadows with gradients or
images. Instead they say, render the shadows with a 3d graphics engine. I
guess I get it, when you have multiple layers overlapping the gradients won't
look right, but I don't know many people who can hire a team of developers
to develop a rendering engine just so the shadows look accurate!

If you care about design and want some guidelines to follow I highly recommend
giving the whole [Material Design][material-design] doc a read. The color
section especially lays out some great choices for those of us who are looking
for inspiration.

[twytch]:      https://github.com/mtytel/twytch
[mopo]:        https://github.com/mtytel/mopo
[material-design]:  http://www.google.com/design/spec/material-design/
