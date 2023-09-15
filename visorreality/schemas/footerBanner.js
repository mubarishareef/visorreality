export default {
    name:'footerBanner',
    title:'Footer Banner',
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
            name:'discount',
            title:'Discount',
            type:'string'
         },
         {
            name:'largeText1',
            title:'Large text 1',
            type:'string'
         },
         {
            name:'largeText2',
            title:'Large text 2',
            type:'string'
         },
         {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
         {
            name:'product',
            title:'Product',
            type:'string'
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
            name:'buttonText',
            title:'Button text',
            type:'string'
         },
         {
            name:'description',
            title:'Description',
            type:'string'
         },
    ]
}