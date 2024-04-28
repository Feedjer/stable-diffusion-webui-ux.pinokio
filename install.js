module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/anapnoe/stable-diffusion-webui-ux app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
     params: {
       uri: "torch.js",
      params: {
        venv: "venv",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
       message: [
          "{{platform === 'win32' ? 'webui-user.bat' : 'bash webui.sh -f'}}",
        ],
       env: {
          "SD_WEBUI_RESTARTING": 1,
        },
       path: "app",
       on: [{ "event": "/http:\/\/[0-9.:]+/", "kill": true }]
      }
    },{
      method: "fs.share",
      params: {
        drive: {
          "checkpoints": "app/models/Stable-diffusion",
  //          "configs": "app/models/Stable-diffusion",
          vae: "app/models/VAE",
          loras: [
            "app/models/Lora",
            "app/models/LyCORIS"
          ],
          upscale_models: [
            "app/models/ESRGAN",
            "app/models/RealESRGAN",
            "app/models/SwinIR"
          ],
          embeddings: "app/embeddings",
          outputs: "app/outputs",
          hypernetworks: "app/models/hypernetworks",
          controlnet: "app/models/ControlNet"
        },
        peers: [
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/AUTOMATIC1111/stable-diffusion-webui.git"
        ]
      }
    },{
        method: "fs.link",
        params: {
          venv: "app/venv"
      }
    },{
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
