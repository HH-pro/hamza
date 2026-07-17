import BlogPost from '@/components/blog/BlogPost'
import Layout from '@/components/layout/Layout'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
	title: 'Blog',
	description:
		'Articles and notes on web development, mobile apps, UI/UX design and building for the web by Hamza Manzoor.',
	path: '/blog',
	tag: 'Blog',
})

export default function Blog() {
    return (
        <>
            <Layout>
                <BlogPost showItem={6} style={1} showPagination />
            </Layout>
        </>
    )
}
