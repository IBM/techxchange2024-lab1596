var plugins = [{
      name: 'gatsby-plugin-manifest',
      plugin: require('/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Carbon Design Gatsby Theme","icon":"src/images/favicon.svg","short_name":"IBM TechXchange 2024","start_url":"/","background_color":"#ffffff","theme_color":"#161616","display":"browser","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"983518b19848eae6cfeb24d757f74f96"},
    },{
      name: 'gatsby-plugin-mdx',
      plugin: require('/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-unwrap-images"},{"resolve":"gatsby-remark-smartypants"},{"resolve":"gatsby-remark-images","options":{"maxWidth":1152,"linkImagesToOriginal":false,"quality":75,"withWebp":false,"pngCompressionSpeed":4}},{"resolve":"gatsby-remark-responsive-iframe"},{"resolve":"gatsby-remark-copy-linked-files"}],"remarkPlugins":[],"defaultLayouts":{"default":"/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-theme-carbon/src/templates/Default.js","home":"/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-theme-carbon/src/templates/Homepage.js"},"lessBabel":false,"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596","JSFrontmatterEngine":false,"engines":{}},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Carbon Design Gatsby Theme","short_name":"Gatsby Theme Carbon","start_url":"/","background_color":"#161616","theme_color":"#161616","display":"browser","icon":"/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-theme-carbon/src/images/favicon.svg","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"983518b19848eae6cfeb24d757f74f96"},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-theme-carbon',
      plugin: require('/Users/ruilinma/Desktop/Tasks/TechXchange 2024/techxchange2024-lab1596/node_modules/gatsby-theme-carbon/gatsby-ssr'),
      options: {"plugins":[],"repository":{"baseUrl":"https://github.com/IBM/techxchange2024-lab2205"},"isSwitcherEnabled":false,"titleType":"append","navigationStyle":"header","isSearchEnabled":false},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
