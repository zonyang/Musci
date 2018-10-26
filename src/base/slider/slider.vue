<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"
            :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: Number
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    this._listenResize()
  },
  activated() {
    this.slider.enable()
    this.currentPageIndex = this.slider.getCurrentPage().pageX
    this.slider.goToPage(this.currentPageIndex, 0, 0)
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth(isResize) {
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].style.width = sliderWidth + 'px'
        width += sliderWidth
        addClass(this.children[i], 'slider-item')
      }
      if (this.loop && !isResize) {
        width += sliderWidth * 2
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 势头，鼠标滑动松手时是否滚动动画
        snap: {
          loop: this.loop, // 环，轮循
          threshold: 0.3,
          speed: 400 // 完成切换时间
        }
      })
      this.currentPageIndex = this.slider.getCurrentPage().pageX
      this.slider.on('scrollEnd', this._onScrollEnd)
      this.slider.on('touchend', () => {
        if (this.autoPlay) {
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    _onScrollEnd() {
      this.currentPageIndex = this.slider.getCurrentPage().pageX
      if (this.autoPlay) {
        this._play()
      }
    },
    refresh() {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    },
    _listenResize() {
      window.addEventListener('resize', () => {
        if (!this.slider || !this.slider.enabled) { // 其他tab页不操作
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    }
  }
  // ,components: {Scroll}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      /*position: relative*/
      /*overflow: hidden*/
      /*white-space: nowrap*/
      .slider-item
        float: left
        /*box-sizing: border-box*/
        /*overflow: hidden*/
        /*text-align: center*/
        a
          display: block
          width: 100%
          // text-decoration: none
          // overflow: hidden
          line-height: 0
          img
            // display: block
            width: 100%
    .dots
      position: absolute
      left: 0
      right: 0
      bottom: 12px
      font-size: 0
      transform: translateZ(1px)
      text-align: center
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
