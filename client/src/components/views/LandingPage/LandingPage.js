import React from 'react';
import { useEffect, useState } from "react";
import { Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import Dropzone from 'react-dropzone';


const {Title} = Typography



function LandingPage() {

    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const onDrop = (files) => {

        console.log(files, 'file')
    
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);
    
        axios.post('/uploadfiles', formData, config)
        console.log('llego hasta aca')
        .then(response => {
            console.log(response, 'response')
            if (response.data.success) {
                let variable = {
                    url: response.data.url,
                    fileName: response.data.fileName
                }
    
                setFilePath(response.data.url)
    
                axios.post('/thumbnail', variable)
                    .then(response => {
                        if (response.data.success) {
    
                            setDuration(response.data.fileDuration)
                            setThumbnail(response.data.url)
    
                        } else {
                            alert('Failed to make the thumbnails')
                        }
                    })
            } else {
                alert('Failed to upload video')
            }
        })
    
    }
    

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} > Upload Video</Title>
            </div>
            <br />

            <Row gutter={16} style={{ background: '#ECECEC', padding: '30px' }}>
                <Dropzone onDrop={onDrop}
                    multiple={false}
                    maxSize={8000000}>
                    {({ getRootProps, getInputProps }) => (
                        <Col span={12}
                            {...getRootProps()}
                        >
                            <div style={{ width: '100%', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                <input {...getInputProps()} />
                                <p style={{ fontSize: '3rem' }}>+</p>
                            </div>
                        </Col>
                    )}
                </Dropzone>

                {/* {thumbnail !== "" &&
                    <Col span={12}>
                        <div>
                            <img src={`http://localhost:3001/${thumbnail}`} alt="haha" />
                        </div>
                    </Col>
                } */}
            </Row>
                <br />
            {/* {thumbnail &&
                <div style={{ background: '#ECECEC', padding: '30px', wordBreak:'break-all' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card hoverable={true} title="Video Path" bordered={false}>
                                {filePath}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card hoverable={true} title="Duration" bordered={false}>
                                {duration}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card hoverable={true} title="Thumbnail Path" bordered={false}>
                                {thumbnail}
                            </Card>
                        </Col>
                    </Row>
                </div>
            } */}

        </div>
    )
}

export default LandingPage
