import {Plugin} from 'vite'
import {readFile} from 'fs/promises'
import { CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_PATH } from '../constants/index';
export function pluginIndexHtml(): Plugin {
  return {
    name: 'island:index-html',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 读取模板内容
          let content = await (await readFile(DEFAULT_TEMPLATE_PATH)).toString()
          content = await server.transformIndexHtml(req.url, content, req.originalUrl)
          res.setHeader('Content-Type', 'text/html')
          res.end(content)
        })
      }
    }
  }
}