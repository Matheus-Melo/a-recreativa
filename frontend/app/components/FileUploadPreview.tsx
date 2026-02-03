'use client'

import { Upload, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Dragger } = Upload
const { Text } = Typography

export default function FileUploadPreview() {
	const [fileUrl, setFileUrl] = useState<string | null>(null)
	const [fileType, setFileType] = useState<string | null>(null)

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Dragger
				multiple={false}
				accept=".pdf,.docx"
				showUploadList={false}
				beforeUpload={(file) => {
					const url = URL.createObjectURL(file)
					setFileUrl(url)
					setFileType(file.type)
					return false
				}}
			>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Clique ou arraste um PDF ou DOCX</p>
			</Dragger>

			{fileUrl && (
				<div
					style={{
						marginTop: 16,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{fileType === 'application/pdf' ? (
						<iframe src={fileUrl} style={{ width: '100%', flex: 1 }} />
					) : (
						<Text type="secondary">
							Preview disponível apenas para arquivos PDF.
						</Text>
					)}
				</div>
			)}
		</div>
	)
}
