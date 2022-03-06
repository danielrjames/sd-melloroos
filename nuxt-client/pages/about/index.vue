<template>
  <div class="">
    <div
      class="my-2 sm:mb-4 text-lg font-semibold tracking-tight text-center text-gray-heading"
    >
      About
    </div>
    <div class="mx-auto prose prose-sm">
      <p>
        While searching for a house in San Diego County, I realized there was no
        easy way to get exact Mello Roos taxes for properties I was interested
        in. Since these taxes do add up, it's nice to know what they are before
        making an offer.
      </p>
      <p>
        After a little digging, I found the steps needed to view this tax info
        to be somewhat cumbersome. And because of that, I decided to build this
        web app to automate that process. I hope it can get the information you
        need and please acknowledge that
        <strong>all data gathered by this application is public record</strong>,
        so if anything is off, take it up with the county. 🤣
      </p>
      <p>
        Anyways, if you like this app, I'm always available to hire for
        <i>little</i>
        projects like this. Feel free to contact me directly
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
import { pageHeadConfig } from '../../utils/app';

export default {
  data() {
    return {
      headConfig: {
        description: 'About page for San Diego Mello Roos Tax Lookup.',
        imgPath: `${this.$config.baseDomain}/images/sdm_og.jpg`,
        ogTitle: 'About | San Diego Mello Roos Tax Lookup',
        title: 'About',
        url: `${this.$config.baseDomain}${this.$route.fullPath}`,
      },
    };
  },

  head() {
    return pageHeadConfig(this.headConfig);
  },
};
</script>
