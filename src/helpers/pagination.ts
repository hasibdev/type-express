

export default async function (Model: any, req: any, { defaultPage = 1, defaultLimit = 25 } = {}) {
   try {
      const { page, perPage } = req.query

      const count = await Model.count()
      const currentPage = Number.parseInt(page) || defaultPage
      const limit = Number.parseInt(perPage) || defaultLimit

      const totalPage = Math.ceil(count / limit)
      const skip = (currentPage - 1) * limit

      const nextPage = currentPage >= totalPage ? null : (currentPage + 1)
      const prevPage = (currentPage - 1) || null

      const meta = {
         count,
         totalPage,
         currentPage,
         nextPage,
         prevPage,
      }

      return Promise.resolve({ meta, limit, skip })
   } catch (error) {
      return Promise.reject(error)
   }
}
