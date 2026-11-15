;(function ($) {
  'use strict'

  function bindScrollTriggers() {
    $(document).off('click.resumeScroll', 'a.js-scroll-trigger[href*="#"]:not([href="#"])')
    $(document).on('click.resumeScroll', 'a.js-scroll-trigger[href*="#"]:not([href="#"])', function () {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          $('html, body').stop(true).animate(
            {
              scrollTop: target.offset().top,
            },
            400,
            'swing'
          )
          return false
        }
      }
    })

    $(document).off('click.resumeCollapse', '.js-scroll-trigger')
    $(document).on('click.resumeCollapse', '.js-scroll-trigger', function () {
      $('.navbar-collapse').collapse('hide')
    })
  }

  function initScrollSpy() {
    if (typeof bootstrap === 'undefined' || !bootstrap.ScrollSpy) {
      return
    }

    const existing = bootstrap.ScrollSpy.getInstance(document.body)
    if (existing) {
      existing.dispose()
    }

    new bootstrap.ScrollSpy(document.body, {
      target: '#sideNav',
    })
  }

  window.initResume = function initResume() {
    bindScrollTriggers()
    initScrollSpy()
  }

  $(function () {
    bindScrollTriggers()
  })
})(jQuery)
