<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable.styl"
  .m-header
    height: 44px
    text-align: center
    color: $color-theme
    // background-color: black
    font-size: 0
    .icon
      display: inline-block
      margin-top: 6px
      margin-right: 9px
      bg-image("logo")
      background-size: 30px 32px
      width: 30px
      height: 32px
      vertical-align: top
    .text
      display: inline-block
      font-size: $font-size-large
      vertical-align: top
      margin: 0
      line-height: 44px
</style>
