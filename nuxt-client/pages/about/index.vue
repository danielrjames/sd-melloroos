<template>
  <div>
    <div
      class="my-2 text-lg font-semibold tracking-tight text-center sm:text-left text-gray-heading"
    >
      About
    </div>
    <div class="prose prose-sm">
      <p>
        While searching for a house in San Diego County, I realized there was no
        easy way to see the exact Mello Roos tax amounts for properties I was
        interested in.
      </p>
      <p>
        After a little digging, I found the process to get this tax info to be
        somewhat cumbersome. And because of that, I decided to build this web
        app.
      </p>
      <p>
        With buying a house today, Mello Roos taxes do add up, so it's nice to
        know what they are up front. I hope this can help you get the
        information you need.
      </p>
      <p>
        If you like this app, I'm always available to hire for little projects
        like this. Feel free to contact me directly
        <span>
          (find me on
          <a
            class="text-primary"
            href="https://www.linkedin.com/in/danjames86/"
            target="_blank"
            rel="noopener noreferrer"
            >LinkedIn</a
          >)</span
        >.
      </p>
      <p>Daniel James</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'About',
    };
  },
};
</script>
