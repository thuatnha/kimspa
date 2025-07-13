"use client";

import { useSearchParams } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedText } from "@/components/animated-text";
import { BookingForm } from "@/components/booking-form";
import { motion } from "framer-motion";
import type { Service } from "@/types/service-types";
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service") || "";
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/services`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        // Transform the API data to match our Service type
        const transformedServices = data.map((service: any) => ({
          id: service._id,
          title: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          image: "/placeholder.svg?height=400&width=600", // Default image since API doesn't provide one
          categoryId: service.category._id, // Default category since API doesn't provide one
          featured: true, // Default featured status
          benefits: service.features || [], // Map features to benefits
          category: service.category,
        }));
        setServices(transformedServices);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
          <main className="flex-1 flex items-center justify-center">
            <p>Loading services...</p>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
          <main className="flex-1 flex items-center justify-center">
            <p className="text-red-500">Error: {error}</p>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container px-4 md:px-6">
              {/* Header */}
              <AnimatedSection
                direction="up"
                className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-block rounded-lg bg-[#FFF9E0] px-3 py-1 text-sm text-[#fdc700]"
                  >
                    Đặt Lịch
                  </motion.div>
                  <AnimatedText
                    text="Đặt Lịch Dịch Vụ Spa"
                    className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
                    duration={0.03}
                  />
                  <AnimatedSection delay={0.3} direction="none">
                    <p className="max-w-[900px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Đặt lịch trực tuyến để trải nghiệm dịch vụ spa cao cấp tại
                      KimSkin Clinic.
                    </p>
                  </AnimatedSection>
                </div>
              </AnimatedSection>

              {/* Booking Form */}
              <BookingForm selectedServiceId={serviceId} services={services} />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
