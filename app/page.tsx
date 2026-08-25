import Layout from "@/components/layout/Layout"
import Home1 from "@/components/sections/Home1"
import Service1 from "@/components/sections/Service1"
import Projects1 from "@/components/sections/Projects1"
import Resume1 from "@/components/sections/Resume1"
import Contact1 from "@/components/sections/Contact1"
import ProofStrip from "@/components/hm/ProofStrip"
import BookCallBand from "@/components/hm/BookCallBand"
import ProcessList from "@/components/hm/ProcessList"
import Testimonials from "@/components/hm/Testimonials"
import FaqList from "@/components/hm/FaqList"
import ClosingCTA from "@/components/hm/ClosingCTA"
import { HomeJsonLd } from "@/components/seo/JsonLd"

export default function Home() {
	return (
		<>
			<HomeJsonLd />
			<Layout headerStyle={1} footerStyle={1}>
				<Home1 />
				<ProofStrip />
				<Service1 />
				<Projects1 />
				<BookCallBand />
				<ProcessList />
				<Resume1 />
				<Testimonials />
				<FaqList />
				<Contact1 />
				<ClosingCTA />
			</Layout>
		</>
	)
}
