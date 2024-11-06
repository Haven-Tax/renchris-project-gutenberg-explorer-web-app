import fs from 'fs'

if (process.env.secrets) {
  const secrets = JSON.parse(process.env.secrets)

  const environmentVariables = Object.entries(secrets)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  fs.appendFileSync('.env', `NODE_ENV=production\n${environmentVariables}\n`)
}
