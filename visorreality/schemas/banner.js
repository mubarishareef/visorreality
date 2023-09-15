export default {
    name:'banner',
    title:'Banner',
    type:'document',
    fields:[
         {
            name:'image',
            title:'Image',
            type:'image',
            options:{
                hotspot:true,
            }
         },
         {
            name:'smallText',
            title:'Small text',
            type:'string'
         },
         {
            name:'slug',
            title:'Slug',
            type:'slug',
         },
         {
            name:'mediumText',
            title:'Medium text',
            type:'string'
         },
         {
            name:'largeText',
            title:'Large text',
            type:'string'
         },
         {
            name:'product',
            title:'Product',
            type:'string'
         },
         {
            name:'buttonText',
            title:'Button text',
            type:'string'
         },
         {
            name:'description',
            title:'Description',
            type:'string'
         },
         {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
    ]
}