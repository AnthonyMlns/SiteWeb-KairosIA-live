/* kAIros. — Sanity client
   Utilise l'API CDN publique de Sanity (apicdn) avec CORS ouvert.
   ────────────────────────────────────────────────────────────── */

window.kairosSanity = (function () {
  'use strict'

  var SANITY = window.__SANITY_CONFIG__ || {}
  var projectId = SANITY.projectId || ''
  var dataset   = SANITY.dataset || 'production'
  var version   = 'v2023-08-01'

  function fetchUseCases() {
    var query = '*[_type == "useCaseCategory"] | order(order asc) { title, tag, tagColor, items[] { title, description, outcome } }'
    var url = 'https://' + projectId + '.apicdn.sanity.io/' + version + '/data/query/' + dataset + '?query=' + encodeURIComponent(query)

    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Sanity fetch failed: ' + res.status)
      return res.json()
    }).then(function (json) {
      return json.result || []
    })
  }

  function renderUseCases(container, categories) {
    if (!container) return

    if (!categories || categories.length === 0) {
      container.innerHTML = '<p style="color:var(--gray-500);text-align:center;padding:48px 0;">Aucun cas d\'usage publié pour le moment.</p>'
      return
    }

    var tagClass = { fast: 'usecase-tag-fast', mid: 'usecase-tag-mid', long: 'usecase-tag-long' }
    var html = '<div class="usecases-grid">'

    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i]
      var tc = tagClass[cat.tagColor] || 'usecase-tag-mid'
      html += '<div class="usecase-col">'
      html += '<div><span class="usecase-tag ' + tc + '">' + esc(cat.tag) + '</span><h3>' + esc(cat.title) + '</h3></div>'
      html += '<ul class="usecase-list" role="list">'

      var items = cat.items || []
      for (var j = 0; j < items.length; j++) {
        var item = items[j]
        html += '<li>'
        html += '<span class="marker marker-yes" aria-hidden="true">✦</span>'
        html += '<div>'
        html += '<strong>' + esc(item.title) + '</strong>'
        html += '<span>' + esc(item.description) + '</span>'
        html += '<span class="usecase-outcome">' + esc(item.outcome) + '</span>'
        html += '</div></li>'
      }

      html += '</ul></div>'
    }

    html += '</div>'
    container.innerHTML = html
  }

  function fetchPosts() {
    var query = '*[_type == "post"] | order(publishedAt desc) { title, slug, publishedAt, excerpt, image, tags, readingTime, seoDescription }'
    var url = 'https://' + projectId + '.apicdn.sanity.io/' + version + '/data/query/' + dataset + '?query=' + encodeURIComponent(query)

    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Sanity fetch failed: ' + res.status)
      return res.json()
    }).then(function (json) {
      return json.result || []
    })
  }

  function renderPosts(container, posts) {
    if (!container) return

    if (!posts || posts.length === 0) {
      container.innerHTML = '<p class="blog-empty">Aucun article publié pour le moment. Revenez bientôt !</p>'
      return
    }

    var html = '<div class="blog-list">'
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i]
      var date = p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('fr-CA') : ''
      var tags = p.tags || []
      var slug = (p.slug && p.slug.current) ? p.slug.current : ''
      var excerpt = p.excerpt || ''
      if (excerpt.length > 200) excerpt = excerpt.slice(0, 197) + '…'

      html += '<article class="blog-post">'
      html += '<div class="blog-post-date">' + esc(date) + '</div>'
      html += '<div>'
      html += '<a href="article.html?slug=' + encodeURIComponent(slug) + '" class="blog-post-title">' + esc(p.title) + '</a>'
      html += '<p class="blog-post-excerpt">' + esc(excerpt) + '</p>'
      html += '<div class="blog-post-footer">'
      for (var t = 0; t < tags.length; t++) {
        html += '<span class="blog-post-tag" data-tag="' + esc(tags[t]) + '">' + esc(tags[t]) + '</span>'
      }
      html += '<a href="article.html?slug=' + encodeURIComponent(slug) + '" class="blog-post-link">Lire l\'article →</a>'
      html += '</div></div></article>'
    }
    html += '</div>'
    container.innerHTML = html
  }

  function fetchPostBySlug(slug) {
    var query = '*[_type == "post" && slug.current == "' + slug + '"][0]'
    var url = 'https://' + projectId + '.apicdn.sanity.io/' + version + '/data/query/' + dataset + '?query=' + encodeURIComponent(query)

    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Sanity fetch failed: ' + res.status)
      return res.json()
    }).then(function (json) {
      return json.result || null
    })
  }

  function renderPostBody(container, post) {
    if (!container) return

    if (!post) {
      container.innerHTML = '<p style="color:var(--gray-500);text-align:center;padding:64px 0;">Article introuvable.</p>'
      return
    }

    var date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-CA') : ''
    var tags = (post.tags || []).map(function (t) { return '<span class="article-tag">' + esc(t) + '</span>' }).join('')
    var readingTime = post.readingTime ? post.readingTime + ' min de lecture' : ''
    var bodyHtml = ''
    var headings = []

    if (post.body) {
      for (var i = 0; i < post.body.length; i++) {
        var block = post.body[i]
        if (block._type === 'table') {
          bodyHtml += renderTable(block)
          continue
        }
        if (block._type === 'block') {
          var text = block.children.map(function (c) { return c.text || '' }).join('')
          if (!text) continue

          var style = block.style || 'normal'

          if (style === 'h2' || style === 'h3') {
            var anchorId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            headings.push({ level: style, id: anchorId, text: text })
            if (style === 'h2') {
              bodyHtml += '<h2 class="article-h2" id="' + anchorId + '">§ ' + esc(text) + '</h2>'
            } else {
              bodyHtml += '<h3 class="article-h3" id="' + anchorId + '">' + esc(text) + '</h3>'
            }
          } else {
            switch (style) {
              case 'h1': bodyHtml += '<h1 class="article-h1">' + esc(text) + '</h1>'; break
              case 'blockquote': bodyHtml += '<blockquote class="article-blockquote">' + esc(text) + '</blockquote>'; break
              case 'code': bodyHtml += '<pre class="article-code"><code>' + esc(text) + '</code></pre>'; break
              default: bodyHtml += '<p class="article-p">' + esc(text) + '</p>'
            }
          }
        }
      }
    }

    var metaHtml = '<div class="article-meta">' +
      (date ? '<time class="article-date">' + date + '</time>' : '') +
      (readingTime ? '<span class="article-reading">' + readingTime + '</span>' : '') +
      (tags ? '<div class="article-tags">' + tags + '</div>' : '') +
      '</div>'

    var headerHtml = metaHtml +
      '<h1 class="article-title">' + esc(post.title) + '</h1>' +
      (post.excerpt ? '<p class="article-excerpt">' + esc(post.excerpt) + '</p>' : '')

    container.innerHTML = headerHtml + '<div class="article-body">' + bodyHtml + '</div>'

    return headings
  }

  function renderTable(tableBlock) {
    var rows = tableBlock.rows || []
    if (rows.length === 0) return ''

    var html = '<div class="article-table-wrapper"><table class="article-table">'
    for (var r = 0; r < rows.length; r++) {
      var cells = rows[r].cells || []
      var tag = r === 0 ? 'th' : 'td'
      html += '<tr>'
      for (var c = 0; c < cells.length; c++) {
        html += '<' + tag + '>' + esc(cells[c]) + '</' + tag + '>'
      }
      html += '</tr>'
    }
    html += '</table></div>'
    return html
  }

  function esc(str) {
    if (!str) return ''
    var div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }

  return {
    fetchUseCases: fetchUseCases,
    renderUseCases: renderUseCases,
    fetchPosts: fetchPosts,
    renderPosts: renderPosts,
    fetchPostBySlug: fetchPostBySlug,
    renderPostBody: renderPostBody,
  }
})()
