import { createClient } from "next-sanity"
import { dataset, projectId, apiVersion, token, useCdn } from "./env"
import imageUrlBuilder from '@sanity/image-url'


export const client=createClient({dataset, projectId, apiVersion, token, useCdn})
const builder = imageUrlBuilder(client);
export function urlFor(source) {
    return builder.image(source)
  }
