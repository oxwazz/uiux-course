import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  PlusOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  Grid,
  Input,
  InputNumber,
  Select,
  Space,
  Steps,
  Tooltip,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { z } from 'zod'

const { RangePicker } = DatePicker
const { Title, Text } = Typography
const { useBreakpoint } = Grid

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const screens = useBreakpoint()

  const ZodSchema = z.object({
    fullName: z.string().nonempty('Please enter your full name'),
    gender: z.string().nonempty('Please select your gender'),
    nationality: z.string().nonempty('Please select your nationality'),
    dateOfBirth: z.string().nonempty('Please enter your date of birth'),
    birthplace: z.string().nonempty('Please enter your birthplace'),
    idNumber: z.string().regex(/^\d+$/, 'ID number must be a numeric value').min(1, 'Please enter your ID number'),
    homeAddress: z.string().nonempty('Please enter your home address'),
    phoneNumber: z.string().regex(/^\d+$/, 'Phone number must be a numeric value').min(1, 'Please enter your phone number'),
    department: z.string().nonempty('Please enter your department'),
    position: z.string().nonempty('Please enter your position'),
    jobTitle: z.string().nonempty('Please enter your job title'),
    startDatePreference: z.string().nonempty('Please enter your start date preference'),
    education: z.array(z.object({
      school: z.string().nonempty('Please enter your school/university'),
      major: z.string().nonempty('Please enter your major/field of study'),
      period: z.array(
        z.string().nonempty('Please enter your education period'),
      ),
    })),
  })

  const form = useForm({
    defaultValues: {
      fullName: '',
      gender: '',
      nationality: '',
      dateOfBirth: '',
      birthplace: '',
      idNumber: '',
      homeAddress: '',
      phoneNumber: '',
      department: '',
      position: '',
      jobTitle: '',
      startDatePreference: '',
      education: [{
        school: '',
        major: '',
        period: ['', ''],
      }],
    },
    validators: {
      onChange: ZodSchema,
    },
    onSubmitInvalid: () => {
      window.document.querySelector('[aria-invalid="true"]')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    },
    onSubmit: async () => {
      // Do something with form data
    },
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Progress Steps */}
        {screens.lg && (
          <Card
            style={{
              marginBottom: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: 'none',
            }}
          >
            <Steps
              current={1}
              size="small"
              items={[
                { title: 'Get Started' },
                { title: 'Application Details' },
                { title: 'Review & Confirm' },
                { title: 'Done' },
              ]}
              style={{
                padding: screens.lg ? '0 40px' : '0',
              }}
            />
          </Card>
        )}

        <Flex gap={24} align="start">
          {/* Summary Sidebar - Only on Desktop */}
          {screens.lg && (
            <Card
              style={{
                width: '320px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: 'none',
                position: 'sticky',
                top: '24px',
              }}
            >
              <Title level={4} style={{ marginTop: 0, fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
                Registration Summary
              </Title>

              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8fafc' }}>
                <Text style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>CURRENT STEP</Text>
                <Text style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>Application Details</Text>
              </div>

              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8fafc' }}>
                <Text style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>ESTIMATED TIME</Text>
                <Text style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>Approx. 5 minutes to complete </Text>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px', display: 'block' }}>
                  Form Completion
                </Text>
                <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', backgroundColor: '#10b981' }}></div>
                </div>
                <Text style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>2 of 4 Complete</Text>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', marginBottom: '20px' }}>
                <Text style={{ fontSize: '14px', color: '#92400e', fontWeight: 500 }}>
                  💡 Make sure to fill all required fields to proceed to the next step
                </Text>
              </div>

              <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                Need help? Contact HR at
                {' '}
                <a href="#">hr@example.com</a>
              </Text>
            </Card>
          )}

          {/* Main Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            style={{ flex: 1 }}
          >
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: 'none',
              }}
            >
              <div style={{ padding: '16px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                  <Tooltip placement="top" title="Application Details">
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <SolutionOutlined style={{ color: 'white' }} />
                    </div>
                  </Tooltip>
                  <Title level={2} style={{ margin: 0, fontSize: '28px', fontWeight: 600 }}>
                    New Employee Registration Form
                  </Title>
                  <Text style={{ fontSize: '16px', color: '#64748b', marginTop: '8px', display: 'block' }}>
                    Please fill in all required information to complete your registration
                  </Text>
                </div>

                {!screens.lg && (
                  <div>
                    <Steps
                      current={1}
                      size="small"
                      items={[
                        { title: 'Get Started' },
                        { title: 'Application Details' },
                        { title: 'Review & Confirm' },
                        { title: 'Done' },
                      ]}
                    />
                  </div>
                )}

                {/* Personal Information Section */}
                <div style={{ marginBottom: '40px' }}>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                    Personal Information
                    {' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Title>

                  <Flex gap={24} vertical={screens.xs} align="start" style={{ marginBottom: '24px' }}>
                    {/* Photo Upload */}
                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', display: screens.xs ? 'inline' : 'block' }}>
                          Profile Photo
                        </Text>
                        <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#aeaeae', display: screens.xs ? 'inline' : 'block' }}>
                          {' '}
                          (optional)
                        </Text>
                      </div>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        style={{
                          width: '100px',
                          height: '100px',
                        }}
                      >
                        <div
                          style={{
                            width: '100px',
                            height: '100px',
                            border: '2px dashed #d1d5db',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f9fafb',
                          }}
                        >
                          <PlusOutlined style={{ fontSize: '20px', color: '#9ca3af' }} />
                          <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '4px' }}>Upload</div>
                        </div>
                      </Upload>
                    </div>

                    {/* Basic Info */}
                    <div style={{ flex: 1, width: '100%' }}>
                      <div style={{ marginBottom: '20px' }}>

                        <form.Field
                          name="fullName"
                          children={(field) => {
                            // Avoid hasty abstractions. Render props are great!
                            return (
                              <>
                                <Text
                                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                  style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                                >
                                  Full Name
                                </Text>
                                <Input
                                  placeholder="Enter your full name"
                                  size="middle"
                                  id={field.name}
                                  name={field.name}
                                  style={{ fontSize: '14px' }}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e => field.handleChange(e.target.value)}
                                  status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}

                                />
                                {field.state.meta.isTouched && !field.state.meta.isValid
                                  ? (

                                // @ts-expect-error its okay
                                      <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                    )
                                  : null}
                              </>

                            )
                          }}
                        />
                      </div>

                      <Flex gap={16} vertical={screens.xs}>
                        <div style={{ flex: 1 }}>
                          <form.Field
                            name="gender"
                            children={(field) => {
                              // Avoid hasty abstractions. Render props are great!
                              return (
                                <>
                                  <Text
                                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                    style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                                  >
                                    Gender
                                  </Text>
                                  <Select
                                    placeholder="Select your gender"
                                    size="middle"
                                    style={{ width: '100%', fontSize: '14px' }}
                                    options={[
                                      { value: 'Male', label: 'Male' },
                                      { value: 'Female', label: 'Female' },
                                    ]}
                                    value={field.state.value || null}
                                    onBlur={field.handleBlur}
                                    onChange={e => field.handleChange(e)}
                                    status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                                  />
                                  {field.state.meta.isTouched && !field.state.meta.isValid
                                    ? (
                                  // @ts-expect-error its okay
                                        <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(', ')}</em>
                                      )
                                    : null}
                                </>

                              )
                            }}
                          />

                        </div>
                        <div style={{ flex: 1 }}>
                          <form.Field
                            name="nationality"
                            children={(field) => {
                              // Avoid hasty abstractions. Render props are great!
                              return (
                                <>
                                  <Text
                                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                    style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                                  >
                                    Nationality
                                  </Text>
                                  <Select
                                    placeholder="Select your nationality"
                                    size="middle"
                                    style={{ width: '100%', fontSize: '14px' }}
                                    options={[
                                      { value: 'Indonesia', label: 'Indonesia' },
                                      { value: 'Malaysia', label: 'Malaysia' },
                                      { value: 'Singapore', label: 'Singapore' },
                                    ]}
                                    value={field.state.value || null}
                                    onBlur={field.handleBlur}
                                    onChange={e => field.handleChange(e)}
                                    status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                                  />
                                  {field.state.meta.isTouched && !field.state.meta.isValid
                                    ? (
                                  // @ts-expect-error its okay
                                        <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                      )
                                    : null}
                                </>

                              )
                            }}
                          />
                        </div>
                      </Flex>
                    </div>
                  </Flex>

                  <Flex gap={16} vertical={screens.xs} style={{ marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="dateOfBirth"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                Date of Birth
                              </Text>
                              <DatePicker
                                placeholder="Select your date of birth"
                                size="middle"
                                style={{ width: '100%', fontSize: '14px' }}
                                maxDate={dayjs()}
                                value={field.state.value ? dayjs(field.state.value) : ''}
                                onBlur={field.handleBlur}
                                onChange={e => field.handleChange(e ? dayjs(e).format('YYYY-MM-DD') : '')}
                                status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                              />
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>

                          )
                        }}
                      />

                    </div>
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="birthplace"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                Birthplace
                              </Text>
                              <Input
                                placeholder="Enter your birthplace"
                                size="middle"
                                style={{ width: '100%', fontSize: '14px' }}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e => field.handleChange(e.target.value)}
                                status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                              />
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>
                          )
                        }}
                      />
                    </div>
                  </Flex>

                  <Flex gap={16} vertical={screens.xs} style={{ marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                        Height
                        {' '}
                        <span style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#aeaeae' }}>
                          (optional)
                        </span>
                      </Text>
                      <InputNumber
                        placeholder="Enter your height"
                        addonAfter="cm"
                        size="middle"
                        min={1}
                        style={{ width: '100%', fontSize: '14px' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                        Weight
                        {' '}
                        <span style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#aeaeae' }}>
                          (optional)
                        </span>
                      </Text>
                      <InputNumber
                        placeholder="Enter your weight"
                        addonAfter="kg"
                        size="middle"
                        min={1}
                        style={{ width: '100%', fontSize: '14px' }}
                      />
                    </div>
                  </Flex>

                  <Flex gap={16} vertical={screens.xs}>
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="idNumber"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                ID Number
                              </Text>
                              <Space.Compact style={{ width: '100%', fontSize: '14px' }}>
                                <Select
                                  size="middle"
                                  placeholder="Select your ID type"
                                  defaultValue="National ID Card"
                                  options={[
                                    { value: 'National ID Card', label: 'National ID Card' },
                                    { value: 'Passport', label: 'Passport' },
                                    { value: 'Driving License', label: 'Driving License' },
                                  ]}
                                />
                                <Input
                                  size="middle"
                                  placeholder="Enter your ID number"
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e => field.handleChange(e.target.value)}
                                  status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                                />
                              </Space.Compact>
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>
                          )
                        }}
                      />
                    </div>
                  </Flex>
                </div>

                <Divider />

                {/* Contact Information */}
                <div style={{ marginBottom: '40px' }}>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                    Contact Information
                    {' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Title>

                  <div style={{ marginBottom: '20px' }}>
                    <form.Field
                      name="homeAddress"
                      children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                          <>
                            <Text
                              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                              style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                            >
                              Home Address
                            </Text>
                            <Input
                              placeholder="Enter your home address"
                              size="middle"
                              style={{ width: '100%', fontSize: '14px' }}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                            />
                            {field.state.meta.isTouched && !field.state.meta.isValid
                              ? (
                            // @ts-expect-error its okay
                                  <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                )
                              : null}
                          </>
                        )
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <form.Field
                      name="phoneNumber"
                      children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                          <>
                            <Text
                              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                              style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                            >
                              Phone Number
                            </Text>
                            <Input
                              placeholder="Enter your phone number"
                              size="middle"
                              style={{ width: '100%', fontSize: '14px' }}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                            />
                            {field.state.meta.isTouched && !field.state.meta.isValid
                              ? (
                            // @ts-expect-error its okay
                                  <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                )
                              : null}
                          </>
                        )
                      }}
                    />
                  </div>
                </div>

                <Divider />

                {/* Professional Information */}
                <div style={{ marginBottom: '40px' }}>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                    Professional Information
                    {' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Title>

                  <Flex gap={16} vertical={screens.xs} style={{ marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="department"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                Department
                              </Text>
                              <Input
                                placeholder="Enter your department"
                                size="middle"
                                style={{ width: '100%', fontSize: '14px' }}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e => field.handleChange(e.target.value)}
                                status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                              />
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>
                          )
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="position"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                Position
                              </Text>
                              <Input
                                placeholder="Enter your position"
                                size="middle"
                                style={{ width: '100%', fontSize: '14px' }}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e => field.handleChange(e.target.value)}
                                status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                              />
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>
                          )
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="jobTitle"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                Job Title
                              </Text>
                              <Input
                                placeholder="Enter your job title"
                                size="middle"
                                style={{ width: '100%', fontSize: '14px' }}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e => field.handleChange(e.target.value)}
                                status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                              />
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>
                          )
                        }}
                      />
                    </div>
                  </Flex>

                  <Flex gap={16} style={{ marginBottom: '20px' }} align="end">
                    <div style={{ flex: 1 }}>
                      <form.Field
                        name="startDatePreference"
                        children={(field) => {
                          // Avoid hasty abstractions. Render props are great!
                          return (
                            <>
                              <Text
                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                              >
                                Start Date Preference
                              </Text>
                              <Select
                                placeholder="Select your start date preference"
                                size="middle"
                                style={{ width: '100%', fontSize: '14px' }}
                                options={[
                                  { value: 'As Soon As Possible', label: 'As Soon As Possible' },
                                  { value: '1 month notice', label: '1 month notice' },
                                ]}
                                value={field.state.value || null}
                                onBlur={field.handleBlur}
                                onChange={e => field.handleChange(e)}
                                status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                              />
                              {field.state.meta.isTouched && !field.state.meta.isValid
                                ? (
                              // @ts-expect-error its okay
                                    <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                  )
                                : null}
                            </>
                          )
                        }}
                      />
                    </div>
                  </Flex>
                </div>

                <Divider />

                {/* Education */}
                <div style={{ marginBottom: '40px' }}>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                    Educations
                    {' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Title>

                  <form.Field
                    name="education"
                    mode="array"
                    children={(field) => {
                      // Avoid hasty abstractions. Render props are great!
                      return (
                        <>
                          <Flex gap="middle" vertical>
                            {field.state.value.map((_, i) => (
                              <Card
                                key={i}
                                size="small"
                                title={`Education ${i + 1}`}
                                extra={(
                                  field.state.value?.length <= 1
                                    ? ''
                                    : (
                                        <Tooltip title="delete education">
                                          <Button
                                            variant="solid"
                                            color="danger"
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            onClick={() => field.removeValue(i)}
                                          />
                                        </Tooltip>
                                      )
                                )}
                              >
                                <Flex gap={16} vertical={screens.xs} style={{ marginBottom: '20px' }}>
                                  <div style={{ flex: 1 }}>
                                    <form.Field
                                      name={`education[${i}].school`}
                                      children={(field) => {
                                      // Avoid hasty abstractions. Render props are great!
                                        return (
                                          <>
                                            <Text
                                              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                              style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                                            >
                                              School/University
                                            </Text>
                                            <Input
                                              placeholder="Enter your school or university name"
                                              size="middle"
                                              style={{ width: '100%', fontSize: '14px' }}
                                              value={field.state.value}
                                              onBlur={field.handleBlur}
                                              onChange={e => field.handleChange(e.target.value)}
                                              status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                                            />
                                            {field.state.meta.isTouched && !field.state.meta.isValid
                                              ? (
                                            // @ts-expect-error its okay
                                                  <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                                )
                                              : null}
                                          </>
                                        )
                                      }}
                                    />
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <form.Field
                                      name={`education[${i}].major`}
                                      children={(field) => {
                                        // Avoid hasty abstractions. Render props are great!
                                        return (
                                          <>
                                            <Text
                                              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                              style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                                            >
                                              Major/Field of Study
                                            </Text>
                                            <Input
                                              placeholder="Enter your major"
                                              size="middle"
                                              style={{ width: '100%', fontSize: '14px' }}
                                              value={field.state.value}
                                              onBlur={field.handleBlur}
                                              onChange={e => field.handleChange(e.target.value)}
                                              status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                                            />
                                            {field.state.meta.isTouched && !field.state.meta.isValid
                                              ? (
                                            // @ts-expect-error its okay
                                                  <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                                )
                                              : null}
                                          </>
                                        )
                                      }}
                                    />
                                  </div>
                                </Flex>

                                <div style={{ }}>
                                  <form.Field
                                    name={`education[${i}].period`}
                                    children={(field) => {
                                      // Avoid hasty abstractions. Render props are great!
                                      return (
                                        <>
                                          <Text
                                            aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid ? 'true' : 'false'}
                                            style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block', color: field.state.meta.isTouched && !field.state.meta.isValid ? 'red' : '#374151' }}
                                          >
                                            Education Period
                                          </Text>
                                          <RangePicker
                                            placeholder={['Start date', 'End date']}
                                            size="middle"
                                            style={{ width: '100%', fontSize: '14px' }}
                                            value={field.state.value as any}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                              field.handleChange(e as any)
                                            }}
                                            status={field.state.meta.isTouched && !field.state.meta.isValid ? 'error' : ''}
                                          />
                                          {field.state.meta.isTouched && !field.state.meta.isValid
                                            ? (
                                          // @ts-expect-error its okay
                                                <em style={{ color: 'red', fontSize: '12px' }}>{field.state.meta.errors.map(err => err.message).join(',')}</em>
                                              )
                                            : null}
                                        </>

                                      )
                                    }}
                                  />

                                </div>
                              </Card>
                            ))}
                          </Flex>
                          <Button
                            onClick={() => field.pushValue({
                              school: '',
                              major: '',
                              period: ['', ''],
                            })}
                            style={{ marginTop: '10px' }}
                            type="link"
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Education
                          </Button>
                        </>
                      )
                    }}
                  />

                </div>

                <Divider />

                {/* Skills & Languages */}
                <div style={{ marginBottom: '40px' }}>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                    Skills & Languages
                  </Title>

                  <div style={{ marginBottom: '20px' }}>
                    <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Languages
                    </Text>
                    <Select
                      mode="tags"
                      placeholder="Select your languages you speak"
                      style={{ width: '100%', fontSize: '14px' }}
                      size="middle"
                      options={[
                        { value: 'Indonesian', label: 'Indonesian' },
                        { value: 'Malay', label: 'Malay' },
                        { value: 'English', label: 'English' },
                      ]}
                    />
                  </div>

                  <div>
                    <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Computer Skills
                    </Text>
                    <Select
                      mode="tags"
                      placeholder="Select your or type your computer skills"
                      style={{ width: '100%', fontSize: '14px' }}
                      size="middle"
                      options={[
                        { value: 'TypeScript', label: 'TypeScript' },
                        { value: 'PHP', label: 'PHP' },
                        { value: 'Python', label: 'Python' },
                        { value: 'JavaScript', label: 'JavaScript' },
                        { value: 'React', label: 'React' },
                        { value: 'Node.js', label: 'Node.js' },
                      ]}
                    />
                  </div>
                </div>

                <Divider />

                {/* Status Information */}
                <div style={{ marginBottom: '40px' }}>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                    Status Information
                  </Title>

                  <Flex gap={16} vertical={screens.xs}>
                    <div style={{ flex: 1 }}>
                      <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                        Political Status
                      </Text>
                      <Select
                        placeholder="Select your political status"
                        size="middle"
                        style={{ width: '100%', fontSize: '14px' }}
                        options={[
                          { value: 'Prefer Not To Say', label: 'Prefer Not To Say' },
                          { value: 'Independent', label: 'Independent' },
                          { value: 'Affiliated', label: 'Affiliated' },
                        ]}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text style={{ lineHeight: 1, fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                        Account Location
                      </Text>
                      <Select
                        placeholder="Select your location"
                        size="middle"
                        style={{ width: '100%', fontSize: '14px' }}
                        options={[
                          { value: 'Indonesia', label: 'Indonesia' },
                          { value: 'Malaysia', label: 'Malaysia' },
                          { value: 'Singapore', label: 'Singapore' },
                        ]}
                      />
                    </div>
                  </Flex>
                </div>
              </div>

              {/* Action Buttons */}
              <Flex justify="space-between" align="center" gap="middle">
                <Button
                  size="large"
                  style={{
                    paddingLeft: '32px',
                    paddingRight: '32px',
                  }}
                  icon={<ArrowLeftOutlined />}
                  iconPosition="start"
                >
                  Back
                </Button>
                <form.Subscribe
                  selector={state => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    // <button type="submit" disabled={!canSubmit}>
                    //     {isSubmitting ? '...' : 'Submit'}
                    // </button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      style={{
                        paddingLeft: '32px',
                        paddingRight: '32px',
                      }}
                      icon={<ArrowRightOutlined />}
                      iconPosition="end"
                      disabled={!canSubmit}
                      loading={isSubmitting}
                    >
                      Continue
                    </Button>
                  )}
                />

              </Flex>
            </Card>
          </form>
        </Flex>
      </div>
    </div>
  )
}
