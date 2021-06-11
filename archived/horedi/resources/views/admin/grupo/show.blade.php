@extends('layouts.master')
@section('content')
    <div class="row pt-3 pb-2 mb-3 border-bottom">
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item"><a href="#">Curso Comipems 2019-2020</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Grupo 1</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list"
                   href="#list-home" role="tab" aria-controls="home">Jeferson Gutierritos</a>
                <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                   href="#list-profile" role="tab" aria-controls="profile">Casimiro Morales</a>
                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                   href="#list-messages" role="tab" aria-controls="messages">Tores Escalona</a>
                <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                   href="#list-settings" role="tab" aria-controls="settings">Minecraft Sherlock</a>
            </div>
        </div>
        <div class="col-9">
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                    <div class="col-md-8 col-lg-8 col-sm-12 mb-3">
                            <h5>Historial</h5>
                            <div class="accordion" id="accordionExample">
                                <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link " type="button"
                                                data-toggle="collapse" data-target="#collapseOne"
                                                aria-expanded="true" aria-controls="collapseOne">
                                            UNAM 2019 área 3
                                        </button>
                                        <div class="float-right">
                                            <a href="#" class="btn btn-success">Corregir</a>
                                        </div>
                                    </h2>
                                </div>
                                <div class="card">
                                    <div id="collapseOne" class="collapse show"
                                         aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-2">
                                                        <h6>Física</h6>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="progress">
                                                            <div class="progress-bar" role="progressbar" style="width:100%;"
                                                                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                                10 /
                                                                12
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <h5 class="mt-1">Puntaje total: 10</h5>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>

                </div>
                <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
            </div>
        </div>
    </div>

@endsection
