import { S3UploadCollectionConfig } from 'payload-s3-upload'

const Media: S3UploadCollectionConfig = {
  slug: 'media',
  upload: {
    // ...
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        crop: 'center',
      },
      {
        name: 'tablet',
        width: 1024,
        height: null,
        crop: 'center',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  hooks: {
    afterRead: [
      ({ doc }: { doc: any }) => {
        // add a url property on the main image
        doc.url = `${process.env.AWS_BUCKET}/${doc.filename}`

        // add a url property on each imageSize
        Object.keys(doc.sizes).forEach(
          (k) => (doc.sizes[k].url = `${process.env.AWS_BUCKET}/${doc.sizes[k].filename}`),
        )
      },
    ],
  },
  fields: [],
}

export default Media
