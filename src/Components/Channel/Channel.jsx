import  React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Sidebar from "react-sidebar";
import './Channel.css'

const mql = window.matchMedia(`(min-width: 800px)`);

export default class Channel extends React.Component{
   
    constructor(props){
        super(props);
        this.state ={
            videos :[
                {
                    title:  '',  link: ''

                }
            ],
            parametro:'',
            sidebarDocked: mql.matches,

            sidebarOpen: false
            
        }
        
        this.getParameter = this.getParameter.bind(this);
        this.handle = this.handle.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);


    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
      }
     
      componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
      }
     
      onSetSidebarOpen(open) {
          
        this.setState({ sidebarOpen: open });
      }
     
      mediaQueryChanged() {

        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
      }

          
    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }
     

    async handle(event){
        event.preventDefault();
        this.setState({videos: []});

        const base_url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D`;
        const channel_id = this.state.parametro.substring(32);
        event.preventDefault();
        await axios({
          method: 'get',
          url:`${base_url}${channel_id}` ,
          headers: {'Content-Type':'application/json'  }
          })
          .then((response) => {
              this.setVideos(response.data)
          })
          .catch((e) => 
          {
            console.error(e);
          });
          
          
    }

    setVideos(parametro){
        parametro.items.forEach(element => {
            let video = this.state.videos;
            video.push({
                title: element.title,
                link: element.link,

            })
            
                this.setState({videos: video})
        
            });
    }

    getParameter(event){
        event.preventDefault();
        this.setState({videos: []});
        this.setState({parametro: event.target.value})

    }


   render(){
        return(
            <div>
               <div>
                    <form className="Channel-Form" onSubmit={this.handle}>
                        <Sidebar
                                sidebar={
                                    <ul>
                                        
                                        {this.state.videos.map((video, index) =>(
                                        <div key={index}>
                                            <div>
                                                
                                                <ReactPlayer
                                                     url={`www.youtube.com/watch?v=${video.link}`}
                                                     controls
                                                     playbackRate = {2}
                                                     className="Frame"
                                                     width="200"
                                                     height="200"

                                                    />
                                            </div>
                                             <a className="Channel-Title" href={`www.youtube.com/watch?v=${video.link}`} onClick={this.d}>{video.title} </a>
                                             <hr/>
                                        </div>
                                        ))}
                                    </ul>
                                }
                              

                                open={this.state.sidebarOpen}
                                onSetOpen={this.onSetSidebarOpen}
                                docked={this.state.sidebarDocked}

                                styles={{ sidebar: { background: "teal" } }}
                                className="s"
                            >
                                <div className="Channel">
                                    <input placeholder="URL" className="Channel-Input" value={this.state.parametro} type="text" onChange={this.getParameter}/>

                                        <button className="Channel-Button" onClick={() => this.onSetSidebarOpen(true)}>
                                            Buscar
                                        </button>
                                </div>
                              
                        </Sidebar>
                        
                    </form>
                </div>
            </div>
        );
    
    }
 
}