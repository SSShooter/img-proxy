import Fastify from 'fastify'
import cors from '@fastify/cors'
import proxy from '@fastify/http-proxy'
const fastify = Fastify()

await fastify.register(cors, {
  // put your options here
  origin: ['https://anime-characters.vercel.app', 'https://anime-characters.ssshooter.com', 'http://localhost:5000'],
  methods: ['GET'],
})

// https://media.kitsu.io/characters/images/3/original.jpg
await fastify.register(proxy, {
  upstream: 'https://media.kitsu.io',
  prefix: '/kitsu', // optional
  http2: false, // optional
})

// https://s4.anilist.co/file/anilistcdn/character/medium/b284158-z1uGKC3IYVa1.png
await fastify.register(proxy, {
  upstream: 'https://s4.anilist.co',
  prefix: '/anilist',
})

await fastify.listen({ port: process.env.PORT || 2333, address: '0.0.0.0' })
