use std::collections::HashMap;

pub async fn toggle_recording(args: HashMap<String, String>) -> anyhow::Result<usize> {
    let service = obws::Client::connect("localhost", 1337, None::<String>).await?;
    let record_service = service.recording();

    let status = record_service.status().await?;
    println!("{:?}", status);
    if status.active {
        record_service.stop().await?;
        return Ok(0);
    }

    record_service.start().await?;
    Ok(0)
}

pub async fn toggle_stream(args: HashMap<String, String>) -> anyhow::Result<usize> {
    let host = args.get("obs_host").unwrap().clone();
    let port = args.get("obs_port").unwrap().clone().parse::<u16>().unwrap();

    let password = args.get("obs_password");

    let service = obws::Client::connect(host, port, password).await?;
    let service = service.streaming();

    let status = service.status().await?;

    match status.active {
        true => service.stop().await?,
        false => service.start().await?,
    }

    Ok(0)
}
