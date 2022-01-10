import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: "Who is Out Boulder County?",
    answer:
      "Out Boulder County is a community advocacy organization with a rich history of providing LGBTQ services and programs. Our mission is to educate, advocate and provide services, programs and support for Boulder County's Lesbian, Gay, Bisexual, Transgender and Queer communities. Through activities, support groups and events we reach over 15,000 people each year. The vision of Out Boulder County is that Boulder County serves as a model of equality, respect, and well-being for Lesbian, Gay, Bisexual, Transgender and Queer people.",
  },
  {
    question: "How did you find my contact information?",
    answer:
      "We scoured the web, finding provider information on websites with LGBTQ+ friendly provider lists, along with personal recommendations from community members.",
  },
  {
    question: "What do I have to gain from being listed?",
    answer:
      "Being listed on Inclusive Care Colorado gives your practice visibility and confirms your commitment to providing inclusive care for all. It demonstrates your support of the LGBTQ+ community and actively takes a step towards gaining healthcare equality. This resource will help LGBTQ community members find your inclusive practice.",
  },
  {
    question: "Do I have to pay to be listed on Inclusive Care Colorado?",
    answer:
      "No, it’s free to you!",
  },
  {
    question: "Why is your questionnaire so long?",
    answer:
      "When we were building our questionnaire we held 7 focus groups made up of LGBTQ+ leaders and community members. These questions were brought up as needed to feel comfortable while entering into new care. Many of the questions are geared towards showing users (not providers) answers to questions they have even if they might be obvious for providers. After collecting all of the questions from our focus groups, we condensed nearly half of the survey questions to what we deemed as critical.",
  },
]


function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

function FAQ() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FAQ
