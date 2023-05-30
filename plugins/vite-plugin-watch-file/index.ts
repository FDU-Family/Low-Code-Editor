import { readFileSync, readdirSync } from 'node:fs'
import path, { normalize } from 'node:path'
import { watch } from 'chokidar'
import type { ViteDevServer } from 'vite'

export interface WatchFileOptions {
  watchFolder: Array<string>
  watchKind: Array<watchKind>
}

export interface msgType {
  path: string
  kind: watchKind
  content: string
}

export type watchKind = 'add' | 'change' | 'unlink'

export function watchFile(eventName: string, options: WatchFileOptions) {
  return {
    name: 'watch-file',

    configureServer(server: ViteDevServer) {
      // add router
      server.middlewares.use('/scripts', (_, res) => {
        const arr = options.watchFolder.map((folder) => {
          // read folder files name
          const files = readdirSync(folder)

          return { folder: files.map(fileName => path.posix.join(folder, fileName)) }
        })
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(arr))
      })
      // watch each folder
      options.watchFolder.forEach((folder) => {
        const watcher = watch(folder, {
          persistent: true,
        })
        options.watchKind.forEach((kind) => {
          watcher.on(kind, async (filePath) => {
            let fileContent = ''
            if (kind !== 'unlink') {
              fileContent = readFileSync(filePath, { encoding: 'utf-8' })
            }
            const data = {
              path: normalize(filePath).replace(/\\/g, '/'),
              kind,
              content: fileContent,
            }
            server.ws.send(eventName, data)
          })
        })
      })
    },
  }
}
