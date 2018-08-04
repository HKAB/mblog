import axios from 'axios'
// import 'es6-promise/auto'

import api from './api'

export default {
  getListPost (totalPost) {
    if (Cache.has('list.' + totalPost)) {
      return Promise.resolve(Cache.get('list.' + totalPost))
    }
    else
    {
      return api().get('all?from=' + totalPost + '&limit=2')
        .then(res => res.data)
        .then(posts => {
          Cache.set('list.' + totalPost, posts)
          return posts
        })
    }
  },
  // addPost (params) {
  //   return api().post('posts', params)
  // },
  // updatePost (params) {
  //   return api().put('posts/' + params.id, params)
  // },
  getPost (id) {
    if (Cache.has('post.' + id)) {
      console.log(id)
      return Promise.resolve(Cache.get('post.' + id))
    }
    else
    {
      return api().get('all/' + id)
        .then(res => res.data)
        .then(post => {
          Cache.set('post.' + id, post)
          return post
        })
    }
  }
  // deletePost (id) {
  //   return api().delete('posts/' + id)
  // }
}

export { axios as axiosInstance }

// Cache processor
const Cache = {
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

/**
 * Parse the file
 * @param {object} 
 */
// const formatFile = ({name, sha, size}) => ({
//   title: onlyTitle(name),
//   date: onlyDate(name),
//   sha,
//   size
// })

// export default {

//   getList () {
//     if (Cache.has('list')) {
//       // Read from cache
//       return Promise.resolve(Cache.get('list')) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve Holy fuck total dont understand :)
//     } else {
//       return axios.get(getListUrl())
//         .then(res => res.data)
//         .then(arr => {
//           // Data cleaning
//           const list = arr.map(formatFile) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map Keyword: Using map to reformat objects in an array
//           // Save into cache
//           Cache.set('list', list)
//           // ..then return
//           return list
//         })
//     }
//   },

//   getDetail (hash) {
//     const httpOpts = {
//       // https://developer.github.com/v3/media/#raw-1
//       headers: { Accept: 'application/vnd.github.v3.raw' }
//     }
//     const cacheKey = 'post.' + hash

//     if (Cache.has(cacheKey)) {
//       // Read from cache
//       return Promise.resolve(Cache.get(cacheKey))
//     } else {
//       return axios.get(getPostUrl(hash), httpOpts)
//         .then(res => res.data)
//         .then(content => {
//           // Save into cache
//           Cache.set(cacheKey, content)
//           // ..then return
//           return content
//         })
//     }
//   },

//   searchFile (query, type = 'code', extension = 'md') {
//     const searchOpts = {
//       query,
//       type,
//       extension,
//       repo: conf.repo,
//       path: conf.path
//     }
//     const cacheKey = `search.${query}`

//     if (Cache.has(cacheKey)) {
//       return Promise.resolve(Cache.get(cacheKey))
//     } else {
//       return axios.get(getSearchUrl(searchOpts))
//         .then(res => res.data)
//         .then(data => {
//           const result = data.items.map(formatFile)
//           Cache.set(cacheKey, result)
//           return result
//         })
//     }
//   }
// }
